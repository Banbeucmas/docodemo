import MapboxGL from '@react-native-mapbox-gl/maps';
import MapboxDirection from '@mapbox/mapbox-sdk/services/directions'

const directionCli = MapboxDirection({accessToken: 'pk.eyJ1IjoidHhhMzEwIiwiYSI6ImNrdHR4aHVucjA1NGIyb3A4amU0cXppMXAifQ.Q_z-xTiDEIbD-DlzL0Wy6A'});


class RoadRender {
    constructor(props) {
        super(props);
        this.state = {
            longitude: 0,
            latitude: 0,
            orderLongitude: 0,
            orderLatitude: 0,
            route: null,
        };
    }

    const getDirections = async (startLoc, destLoc) => {
        const reqOptions = {
          waypoints: [
            {coordinates: startLoc},
            {coordinates: destLoc},
          ],
          profile: 'driving',
          geometries: 'geojson',
        };
      
        const res = await directionCli.getDirections(reqOptions).send();
        const route = lineString(res.body.routes[0].geometry.coordinates)
        console.debug("Route: ", JSON.stringify(route))
        this.setState({route: route})
      }
}

