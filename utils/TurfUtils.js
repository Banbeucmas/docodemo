import {point} from '@turf/helpers';

export function makeRadius(lngLatArr, radius){
    var point = turf.point(lngLatArr);
    var buffer = turf.buffer(point, radius, { units: 'Meters'});
}