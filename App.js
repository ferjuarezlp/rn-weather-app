import { OPENWEATHER_API_KEY } from "./src/api/OpenWeatherAPIKey";
import { deviceLanguage, convertDate, capitalize } from "./src/utils/Utils";

import Geolocation from "@react-native-community/geolocation";

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import ProgressView from "./src/components/ProgressView";
import Weather from "./src/components/Weather";
import WeatherExtended from "./src/components/WeatherExtended";
import {
  Provider as PaperProvider,
  Appbar,
  DefaultTheme,
} from "react-native-paper";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import "react-native-gesture-handler";

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isLoading: false,
    currentLocation: null,
    weatherData: null,
    weatherExtended: null,
    city: "",
    country: "",
    errorMessage: "",
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.findCurrentLocation();
  }

  // TODO would be better if all logic related with geolocation would be separated from view
  findCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({ currentLocation: position.coords });
        this.callWeatherDataWithCoord(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      (error) => {
        this.showLocationPermissionNotGranted();
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  showLocationPermissionNotGranted = () => {
    console.log("error");
  };

  // TODO would be better if all logic related with openweather API would be separated from view
  callWeatherDataWithCoord(lat, lng) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&lang=${deviceLanguage}&units=metric&APPID=${OPENWEATHER_API_KEY}`;
    fetch(url)
      .then(handleErrors)
      .then((resp) => resp.json())
      .then((data) => {
        const weatherObj = {
          weather: data.weather,
          temp: data.main.temp,
        };
        this.setState({
          weatherData: weatherObj,
          city: data.name,
          country: data.sys.country,
          errorMessage: "",
        });
        this.callWeatherForecast(lat, lng);
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });

    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }
  }

  callWeatherForecast(lat, lng) {
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&lang=${deviceLanguage}&units=metric&cnt=6&APPID=${OPENWEATHER_API_KEY}`;
    fetch(url)
      .then(handleErrors)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          weatherExtended: data.list,
          errorMessage: "",
          isLoading: false,
        });
      })

      .catch((error) => {
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

  render() {
    // TODO fix integrate with react-navigation issues
    /*const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );*/

    if (this.state.weatherData == null && this.state.isLoading) {
      return this.renderLoading();
    } else {
      return (
        <PaperProvider
          theme={theme}
          settings={{
            icon: (props) => <AwesomeIcon {...props} />,
          }}
        >
          <Appbar style={styles.appBar}>
            <Appbar.Action
              icon="bars"
              color="#3c3b3b"
              onPress={() => console.log("Pressed menu")}
            />
            <Appbar.Content title="" />
            <Appbar.Action
              icon="search"
              color="#3c3b3b"
              onPress={() => console.log("Pressed settings")}
            />
          </Appbar>

          <Weather
            weather={this.state.weatherData}
            city={this.state.city}
            country={this.state.country}
          ></Weather>
          <View style={styles.main}>
            <WeatherExtended
              weatherExtended={this.state.weatherExtended}
            ></WeatherExtended>
          </View>
        </PaperProvider>
      );
    }
  }
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#f1f2f3",
    accent: "#f1f2f3",
    text: "#515151",
    surface: "#FF6766",
    underlineColor: "transparent",
    background: "#f1f2f3",
    contained: "#000000",
  },
};

const styles = StyleSheet.create({
  appBar: {
    elevation: 0,
  },

  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },

  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 48,
    color: "#fff",
  },

  main: {
    flex: 1,
    height: "100%",
    backgroundColor: "#f1f2f3",
  },
});

export default App;
