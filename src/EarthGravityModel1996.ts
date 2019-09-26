import * as fs from "fs";
import * as Cesium from "cesium";

/**
 * The Earth Gravity Model 1996 (EGM96) geoid.
 * @param gridFileUrl The URL of the WW15MGH.DAC file.
 */
export default class EarthGravityModel1996 {
  gridFilename: string;
  data: any;
  minimumHeight: number;
  maximumHeight: number;

  constructor(gridFilename: string) {
    this.gridFilename = gridFilename;
    this.data = undefined;

    // These values were determined by inspecting the WW15MGH.DAC file.  We hard-code them here because
    // we need them available before that file finishes loading.
    this.minimumHeight = -106.99;
    this.maximumHeight = 85.39;
  }

  /**
   * Determines if this class will work in the current environment.  It will return false on older browsers without support
   * for typed arrays.
   * @return {Boolean} True if this class may be used in this environment; otherwise, false.
   */
  isSupported(): boolean {
    return (
      typeof Int16Array !== "undefined" && typeof Uint8Array !== "undefined"
    );
  }

/**
 * Gets the height of EGM96 above the surface of the ellipsoid.
 * @param {Number} longitude The longitude.
 * @param {Number} latitude The latitude
 * @return {Number} The height of mean sea level above the ellipsoid at the specified location.  Negative numbers indicate that mean sea level
 *                  is below the ellipsoid.
 */
  getHeight(
    longitude: number,
    latitude: number
  ): number {
    return getHeightFromData(getHeightData(this), longitude, latitude);
  };

  getHeights(cartographicArray) {
    const data = getHeightData(this);
    for (var i = 0; i < cartographicArray.length; ++i) {
      var cartographic = cartographicArray[i];
      cartographic.height = getHeightFromData(
        data,
        cartographic.longitude,
        cartographic.latitude
      );
    }
    return cartographicArray;
  };
}

function getHeightData(model) {
  if (!Cesium.defined(model.data)) {
    const data = fs.readFileSync(model.gridFilename);

    // Data file is big-endian, all relevant platforms are little endian, so swap the byte order.
    var byteView = new Uint8Array(
      data.buffer,
      data.byteOffset,
      data.byteLength
    );
    for (var k = 0; k < byteView.length; k += 2) {
      var tmp = byteView[k];
      byteView[k] = byteView[k + 1];
      byteView[k + 1] = tmp;
    }
    model.data = new Int16Array(
      data.buffer,
      data.byteOffset,
      data.byteLength / Int16Array.BYTES_PER_ELEMENT
    );
  }

  return model.data;
}

function getHeightFromData(data, longitude, latitude) {
  var recordIndex = (720 * (Cesium.Math.PI_OVER_TWO - latitude)) / Math.PI;
  if (recordIndex < 0) {
    recordIndex = 0;
  } else if (recordIndex > 720) {
    recordIndex = 720;
  }

  longitude = Cesium.Math.zeroToTwoPi(longitude);
  var heightIndex = (1440 * longitude) / Cesium.Math.TWO_PI;
  if (heightIndex < 0) {
    heightIndex = 0;
  } else if (heightIndex > 1440) {
    heightIndex = 1440;
  }

  var i = heightIndex | 0;
  var j = recordIndex | 0;

  var xMinusX1 = heightIndex - i;
  var yMinusY1 = recordIndex - j;
  var x2MinusX = 1.0 - xMinusX1;
  var y2MinusY = 1.0 - yMinusY1;

  var f11 = getHeightValue(data, j, i);
  var f21 = getHeightValue(data, j, i + 1);
  var f12 = getHeightValue(data, j + 1, i);
  var f22 = getHeightValue(data, j + 1, i + 1);

  return (
    (f11 * x2MinusX * y2MinusY +
      f21 * xMinusX1 * y2MinusY +
      f12 * x2MinusX * yMinusY1 +
      f22 * xMinusX1 * yMinusY1) /
    100.0
  );
}

// Heights returned by this function are in centimeters.
function getHeightValue(data, recordIndex, heightIndex) {
  if (recordIndex > 720) {
    recordIndex = 720;
  } else if (recordIndex < 0) {
    recordIndex = 0;
  }

  if (heightIndex > 1439) {
    heightIndex -= 1440;
  } else if (heightIndex < 0) {
    heightIndex += 1440;
  }

  return data[recordIndex * 1440 + heightIndex];
}
