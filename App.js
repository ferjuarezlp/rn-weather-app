import { OPENWEATHER_API_KEY } from "./src/api/OpenWeatherAPIKey";
import { deviceLanguage } from "./src/utils/Utils";

import Geolocation from "@react-native-community/geolocation";

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProgressView from "./src/components/ProgressView";
import { Provider as PaperProvider, Appbar } from "react-native-paper";

class App extends Component {
  state = {
    isLoading: false,
    currentLocation: null,
    weatherData: null,
    city: "",
    country: "",
    errorMessage: ""
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.findCurrentLocation();
  }

  findCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        this.callWeatherDataWithCoord(
          position.coords.latitude,
          position.coords.longitude
        );
        this.setState({ currentLocation: position.coords });
      },
      error => {
        this.showLocationPermissionNotGranted();
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  showLocationPermissionNotGranted = () => {
    console.log("error");
  };

  callWeatherDataWithCoord(lat, lng) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&lang=${deviceLanguage}&APPID=${OPENWEATHER_API_KEY}`;
    fetch(url)
      .then(handleErrors)
      .then(resp => resp.json())
      .then(data => {
        const weatherObj = {
          weather: data.weather,
          temp: data.main.temp
        };
        this.setState({
          weatherData: weatherObj,
          city: data.name,
          country: data.sys.country,
          errorMessage: "",
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
      });

    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }
  }

  renderLoading() {
    return (
      <PaperProvider>
        <ProgressView isLoading={this.state.isLoading} />
      </PaperProvider>
    );
  }

  renderMain() {
    return (
      <PaperProvider>
        <Appbar style={styles.top}>
          <Appbar.Action
            icon="menu"
            onPress={() => console.log("Pressed menu")}
          />
          <Appbar.Content title="App" />
          <Appbar.Action
            icon="settings"
            onPress={() => console.log("Pressed settings")}
          />
        </Appbar>

        <MaterialCommunityIcons
          size={48}
          name="weather-sunny"
          color={"#f7b733"}
        />
        <Text style={styles.tempText}>Temperature˚</Text>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>So Sunny</Text>
          <Text style={styles.subtitle}>It hurts my eyes!</Text>
          <Text>City: {JSON.stringify(this.state.city)}</Text>
          <Text>Country: {JSON.stringify(this.state.country)}</Text>
          <Text>Weather: {JSON.stringify(this.state.weatherData)}</Text>
        </View>
      </PaperProvider>
    );
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoading();
    } else {
      return this.renderMain();
    }
  }
}

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: "#f7b733"
  },

  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0
  },

  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  title: {
    fontSize: 48,
    color: "#fff"
  }
});

export default App;
