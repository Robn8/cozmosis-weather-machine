import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'
import UnitsPicker from './components/UnitsPicker'
import ReloadIcon from './components/ReloadIcon'
import WeatherDetails from './components/WeatherDetails'
import { colors } from './utils/index'

const WEATHER_API_KEY = ' // API Key goes here'

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)

  // Can be set to 'metric as well'
  const [unitsSystem, setUnitsSystem] = useState('imperial')

  useEffect(() => {
    load()
  }, [unitsSystem])
  async function load() {
    setCurrentWeather(null)
    setErrorMessage(null)
    try {
      // Notification when you open an app
      // and it requests permision for location
      let { status } = await Location.requestPermissionsAsync()

      if(status != 'granted') {
        setErrorMessage('Acces to location is needed to run the app')
        return
      }

      // Get location
      const location = await Location.getCurrentPositionAsync()
      // Use location to get latitude and longitude cordinates
      const {latitude, longitude} = location.coords

      // API Call
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

      const response = await fetch(weatherUrl)

      const result = await response.json()

      if(response.ok) {
        setCurrentWeather(result)
      } else {
          setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  if (currentWeather) {

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main} >
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
          <ReloadIcon load={load}/>
          <WeatherInfo currentWeather={currentWeather}/>
        </View>
        <WeatherDetails  currentWeather={currentWeather} unitsSystem={unitsSystem} />
      </View>
    )
  } else if (errorMessage) {
      return (
        <View style={styles.container}>
          <ReloadIcon load={load} />
          <Text style={{textAlign:'center'}}>{errorMessage}</Text>
          <StatusBar style="auto" />
        </View>
        )
    } else {
      return (
        <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  }
});
