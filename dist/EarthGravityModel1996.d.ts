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
     * @param {Number} longitude The longitude in radians. If your longitude is in
     *        degrees, multiply it by `(2 * Math.PI / 180.0)` before passing it to
     *        this function.
     * @param {Number} latitude The latitude in radians. If your latitude is in
     *        degrees, multiply it by `(2 * Math.PI / 180.0)` before passing it to
     *        this function.
     * @return {Number} The height of mean sea level above the ellipsoid at the specified location.  Negative numbers indicate that mean sea level
     *                  is below the ellipsoid. Heights are in meters.
     */
    getHeight(longitude: number, latitude: number): number;
    /**
     * Gets the EGM96 geoid heights for an array of element with `longitude`, `latitude`,
     * and `height` properties. The `longitude` and `latitude` are in radians and the
     * height is in meters. The `height` property is replaced with the geoid height
     * on return.
     * @param cartographicArray
     */
    getHeights(cartographicArray: any): any;
}
/**
 * Gets the height of EGM96 above the surface of the ellipsoid.
 * @param {Number} longitude The longitude in radians. If your longitude is in
 *        degrees, multiply it by `(2 * Math.PI / 180.0)` before passing it to
 *        this function.
 * @param {Number} latitude The latitude in radians. If your latitude is in
 *        degrees, multiply it by `(2 * Math.PI / 180.0)` before passing it to
 *        this function.
 * @return {Number} The height of mean sea level above the ellipsoid at the specified location.  Negative numbers indicate that mean sea level
 *                  is below the ellipsoid.
 */
export declare function getHeight(longitude: number, latitude: number): number;
