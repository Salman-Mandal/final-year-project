import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import axios from 'axios';
import backgroundImage from '../assets/teagarden.jpg'; // Ensure this path is correct
import LottieView from 'lottie-react-native';
import animation from '../assets/loader.json'; // Ensure this path is correct

function Main({ route }) {
    const { latitude, longitude } = route.params;
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWeather() {
            try {
                setLoading(true);
                const cityUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=13f4c435290b492fb6a0d76f6440bc8f`;
                const response = await axios.get(cityUrl);
                const result = response.data.results[0];
                const city = result.components.city || result.components.town || result.components.village || result.components.hamlet;

                const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=5b27a6ef3547402582e62007222306&q=${city}`;
                const weatherResponse = await axios.get(weatherUrl);
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
            } finally {
                setLoading(false);
            }
        }

        fetchWeather();
    }, [latitude, longitude]);

    return (
        <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
            <View style={styles.container}>
                {loading ? (
                    <View style={styles.loaderContainer}>
                        <LottieView
                            source={animation}
                            autoPlay
                            loop
                            style={styles.loader}
                        />
                    </View>
                ) : (
                    weatherData && (
                        <>
                            <Card containerStyle={styles.card}>
                                <Card.Title style={styles.title}>{weatherData.city}</Card.Title>
                                <Card.Divider />
                                <View style={styles.infoContainer}>
                                    <View style={styles.infoItem}>
                                        <Icon name="thermometer" type="font-awesome" />
                                        <Text style={styles.infoText}>Temperature: {weatherData.temperatureCelsius}°C / {weatherData.temperatureFahrenheit}°F</Text>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <Icon name="weather-cloudy" type="material-community" />
                                        <Text style={styles.infoText}>Condition: {weatherData.conditionText}</Text>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <Icon name="weather-windy" type="material-community" />
                                        <Text style={styles.infoText}>Wind Speed: {weatherData.windSpeedKph} Kph</Text>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <Icon name="water-outline" type="ionicon" />
                                        <Text style={styles.infoText}>Humidity: {weatherData.humidity}%</Text>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <Icon name="eye" type="ionicon" />
                                        <Text style={styles.infoText}>Visibility: {weatherData.visibilityKm} km / {weatherData.visibilityMiles} miles</Text>
                                    </View>
                                </View>
                            </Card>

                            <Card containerStyle={styles.additionalCard}>
                                <Text style={styles.additionalTitle}>Futuristic Weather Data</Text>
                                <View style={styles.additionalInfoContainer}>
                                    <View style={styles.additionalInfoItem}>
                                        <Text style={styles.additionalInfoText}>Precipitation: 3.2 mm</Text>
                                    </View>
                                    <View style={styles.additionalInfoItem}>
                                        <Text style={styles.additionalInfoText}>Max Temperature: 32°C</Text>
                                    </View>
                                    <View style={styles.additionalInfoItem}>
                                        <Text style={styles.additionalInfoText}>Min Temperature: 23°C</Text>
                                    </View>
                                    <View style={styles.additionalInfoItem}>
                                        <Text style={styles.additionalInfoText}>Wind: 4.7 kph</Text>
                                    </View>
                                </View>
                            </Card>
                        </>
                    )
                )}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    loaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loader: {
        width: 150,
        height: 150,
    },
    card: {
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 20,
        margin: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        marginLeft: 10,
    },
    additionalCard: {
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 20,
        margin: 20,
    },
    additionalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    additionalInfoContainer: {
        alignItems: 'center',
    },
    additionalInfoItem: {
        marginBottom: 10,
    },
    additionalInfoText: {
        fontSize: 16,
    },
});

export default Main;
