import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { weatherConditions } from "../utils/Conditions";

const WeatherExtended = ({ weatherExtended }) => {
  if (weatherExtended != null) {
    let day1 = weatherExtended[1];
    let day2 = weatherExtended[2];
    let day3 = weatherExtended[3];
    let day4 = weatherExtended[4];
    let day5 = weatherExtended[5];
    let iconSize = 35;
    return (
      <View style={styles.bottomContainer}>
        <View style={styles.iconContainer}>
          <View style={styles.forecastContainer}>
            <Text style={styles.smallTitle}>
              {convertDate(new Date(day1.dt * 1000))}
            </Text>
            <Text numberOfLines={1} style={styles.miniTitle}>
              {capitalize(day1.weather[0].description)}
            </Text>
            <MaterialCommunityIcons
              size={iconSize}
              name={weatherConditions[day1.weather[0].main].icon}
              color={weatherConditions[day1.weather[0].main].color}
            />
            <Text style={styles.miniTitle}>{day1.temp.min}˚C</Text>
            <Text style={styles.miniTitle}>{day1.temp.max}˚C</Text>
          </View>

          <View style={styles.forecastContainer}>
            <Text style={styles.smallTitle}>
              {convertDate(new Date(day2.dt * 1000))}
            </Text>
            <Text numberOfLines={1} style={styles.miniTitle}>
              {capitalize(day2.weather[0].description)}
            </Text>
            <MaterialCommunityIcons
              size={iconSize}
              name={weatherConditions[day2.weather[0].main].icon}
              color={weatherConditions[day2.weather[0].main].color}
            />
            <Text style={styles.miniTitle}>{day2.temp.min}˚C</Text>
            <Text style={styles.miniTitle}>{day2.temp.max}˚C</Text>
          </View>

          <View style={styles.forecastContainer}>
            <Text style={styles.smallTitle}>
              {convertDate(new Date(day3.dt * 1000))}
            </Text>
            <Text numberOfLines={1} style={styles.miniTitle}>
              {capitalize(day3.weather[0].description)}
            </Text>
            <MaterialCommunityIcons
              size={iconSize}
              name={weatherConditions[day3.weather[0].main].icon}
              color={weatherConditions[day3.weather[0].main].color}
            />
            <Text style={styles.miniTitle}>{day3.temp.min}˚C</Text>
            <Text style={styles.miniTitle}>{day3.temp.max}˚C</Text>
          </View>

          <View style={styles.forecastContainer}>
            <Text style={styles.smallTitle}>
              {convertDate(new Date(day4.dt * 1000))}
            </Text>
            <Text numberOfLines={1} style={styles.miniTitle}>
              {capitalize(day4.weather[0].description)}
            </Text>
            <MaterialCommunityIcons
              size={iconSize}
              name={weatherConditions[day4.weather[0].main].icon}
              color={weatherConditions[day4.weather[0].main].color}
            />
            <Text style={styles.miniTitle}>{day4.temp.min}˚C</Text>
            <Text style={styles.miniTitle}>{day4.temp.max}˚C</Text>
          </View>

          <View style={styles.forecastContainer}>
            <Text style={styles.smallTitle}>
              {convertDate(new Date(day5.dt * 1000))}
            </Text>
            <Text numberOfLines={1} numberOfLines={1} style={styles.miniTitle}>
              {capitalize(day5.weather[0].description)}
            </Text>
            <MaterialCommunityIcons
              size={iconSize}
              name={weatherConditions[day5.weather[0].main].icon}
              color={weatherConditions[day5.weather[0].main].color}
            />
            <Text style={styles.miniTitle}>{day5.temp.min}˚C</Text>
            <Text style={styles.miniTitle}>{day5.temp.max}˚C</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return <View style={styles.bottomContainer}></View>;
  }
};

function convertDate(inputFormat) {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1)].join("/");
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const styles = StyleSheet.create({
  forecastContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f1f2f3",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 8,
  },

  miniTitle: {
    fontFamily: "Raleway",
    fontSize: 14,
  },
  smallTitle: {
    fontFamily: "Raleway",
    fontSize: 18,
  },
  mediumTitle: {
    fontFamily: "Raleway",
    fontSize: 20,
  },
  titleTemp: {
    fontFamily: "Raleway",
    fontSize: 60,
  },
});

export default WeatherExtended;
