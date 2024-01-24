import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import worldGeoJSON from '../assets/countries.geo.json'; // Path to your GeoJSON data
// TODO: Check all countries are avail, else use https://www.naturalearthdata.com/





const WorldMap = ({ data }) => {
    const [geoJson, setGeoJson] = useState(null);

    useEffect(() => {
        if (data && worldGeoJSON) {
            const dataMap = new Map(data.map(item => [item.id, item.value]));

            const features = worldGeoJSON.features.map(feature => {
                const value = dataMap.get(feature.id);
                return { ...feature, properties: { ...feature, value } };
            })

            const updatedGeoJson = {
                ...worldGeoJSON,
                features: worldGeoJSON.features.map(feature => {
                    const value = dataMap.get(feature.id);
                    return { ...feature, properties: { ...feature.properties, value } };
                }),
            };

            setGeoJson(updatedGeoJson);
        }
    }, [data]);

    const getColor = value => {
        // Define your color scale here
        return value > 50 ? '#800026' :
            value > 25  ? '#BD0026' :
            value > 10  ? '#E31A1C' :
            value > 0   ? '#FC4E2A' :
                            '#fff'; // Default color
    };

    const style = feature => {
        return {
        fillColor: getColor(feature.properties.value),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
        };
    };

    // function highlightFeature(e) {
    //     var layer = e.target;
    
    //     layer.setStyle({
    //         weight: 5,
    //         color: '#666',
    //         dashArray: '',
    //         fillOpacity: 0.7
    //     });
    
    //     layer.bringToFront();
    // }

    // function resetHighlight(e) {
    //     geojson.resetStyle(e.target);
    // }

    return (
        <MapContainer center={[30, 0]} zoom={2} scrollWheelZoom={false} style={{ height: '500px', width: '100%', 'z-index': 0}} >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {geoJson && <GeoJSON data={geoJson} style={style} />}
        </MapContainer>
    );
    
    // return (
    //     <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={false} className='h-96'>
    //         <TileLayer
    //             attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
    //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
    //     </MapContainer>
    // );
};

export default WorldMap;
