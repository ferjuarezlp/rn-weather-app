import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { weatherConditions } from "../utils/Conditions";

const Weather = ({ weather, city, country }) => {
  if (weather != null && city != null && country != null) {
    let weatherCondition = weather.weather[0].main;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>
          {city} {country}
        </Text>

        <View style={styles.conditionsContainer}>
          {
            <MaterialCommunityIcons
              size={156}
              name={weatherConditions[weatherCondition].icon}
              color={weatherConditions[weatherCondition].color}
            />
          }

          <Text style={styles.titleTemp}>{weather.temp}˚c</Text>
        </View>
        <View style={styles.iconContainer}></View>
      </View>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.iconContainer}></View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "50%",
    alignItems: "center",
    backgroundColor: "#f1f2f3",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  conditionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Raleway",
    fontSize: 40,
  },
  titleTemp: {
    fontFamily: "Raleway",
    fontSize: 50,
    marginStart: 20,
  },
});

export default Weather;
