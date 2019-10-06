# Earth Gravity Model 1996

Tools for working with the Earth Gravity Model 1996 (EGM96). Primarily useful for calculating the geoid height or mean sea level height at a given longitude and latitude.

Originally written as part of [TerriaJS](https://github.com/TerriaJS/terriajs), now a separate library.

```js
const egm96 = require("earthgravitymodel1996");

// Get the geoid height in Sydney Asustralia
const geoidHeight = egm96.getHeight(
    151.2 * Math.PI / 180.0,
    -33.8 * Math.PI / 180.0
);
```
