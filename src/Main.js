import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';

import { Card } from 'react-native-elements';

function Main({ route }) {
    const { latitude, longitude } = route.params;
    const apikey = "57027dd8d2420ec03d931792518f4f16";
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        async function fetchWeather() {
            try {
                const cityUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=13f4c435290b492fb6a0d76f6440bc8f`;
                const response = await axios(cityUrl);
                const result = response.data.results[0];
                const city = result.components.city;

                const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=5b27a6ef3547402582e62007222306&q=${city}`;
                const weatherResponse = await axios(weatherUrl);
                const { current, location } = weatherResponse.data;

                setWeatherData({
                    city,
                    temperatureCelsius: current.temp_c,
                    temperatureFahrenheit: current.temp_f,
                    conditionText: current.condition.text,
                    windSpeedKph: current.wind_kph,
                    humidity: current.humidity,
                    visibilityKm: current.vis_km,
                    visibilityMiles: current.vis_miles,
                });
            } catch (error) {
                console.log(error);
            }
        }

        fetchWeather();
    }, [latitude, longitude]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Main Component</Text>
            {latitude && longitude && (
                <Text>
                    Latitude: {latitude}, Longitude: {longitude}
                </Text>
            )}
            {weatherData && (
                <Card>
                    <Card.Title>{weatherData.city}</Card.Title>
                    <Card.Divider />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Icon name="thermometer" type="font-awesome" />
                        <Text>Temperature: {weatherData.temperatureCelsius}°C / {weatherData.temperatureFahrenheit}°F</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Icon name="weather-cloudy" type="material-community" />
                        <Text>Condition: {weatherData.conditionText}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Icon name="weather-windy" type="material-community" />
                        <Text>Wind Speed: {weatherData.windSpeedKph} Kph</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Icon name="water-outline" type="ionicon" />
                        <Text>Humidity: {weatherData.humidity}%</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Icon name="eye" type="ionicon" />
                        <Text>Visibility: {weatherData.visibilityKm} km / {weatherData.visibilityMiles} miles</Text>
                    </View>
                </Card>
            )}
        </View>
    );
}

export default Main;
