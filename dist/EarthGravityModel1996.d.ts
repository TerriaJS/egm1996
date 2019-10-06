/**
 * The Earth Gravity Model 1996 (EGM96) geoid.
 * @param gridFileUrl The URL of the WW15MGH.DAC file.
 */
export declare class EarthGravityModel1996 {
    gridFilename: string;
    data: any;
    minimumHeight: number;
    maximumHeight: number;
    constructor(gridFilename: string);
    /**
     * Determines if this class will work in the current environment.  It will return false on older browsers without support
     * for typed arrays.
     * @return {Boolean} True if this class may be used in this environment; otherwise, false.
     */
    isSupported(): boolean;
    /**
     * Gets the height of EGM96 above the surface of the ellipsoid.
     * @param {Number} longitude The longitude.
     * @param {Number} latitude The latitude
     * @return {Number} The height of mean sea level above the ellipsoid at the specified location.  Negative numbers indicate that mean sea level
     *                  is below the ellipsoid.
     */
    getHeight(longitude: number, latitude: number): number;
    getHeights(cartographicArray: any): any;
}
/**
 * Gets the height of EGM96 above the surface of the ellipsoid.
 * @param {Number} longitude The longitude.
 * @param {Number} latitude The latitude
 * @return {Number} The height of mean sea level above the ellipsoid at the specified location.  Negative numbers indicate that mean sea level
 *                  is below the ellipsoid.
 */
export declare function getHeight(longitude: number, latitude: number): number;
