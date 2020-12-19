import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { Picker } from '@react-native-community/picker'

export default function UnitsPicker({ unitsSystem, setUnitsSystem }) {
  return(
    <View style={styles.unitsSystem}>
      <Picker
        selectedValue={unitsSystem}
        onValueChange={(item) => setUnitsSystem(item)}
        mode="dropdown"
        itemStyle={{ fontSize: 12 }}
      >
        <Picker.Item  label="F°" value='imperial' />
        <Picker.Item label="C°" value="metric" />
      </Picker>
    </View>
  )
}
const styles = StyleSheet.create({
  unitsSystem: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 0,

      },
      android: {
        top: 20,
      },
    }),
    top: 0,
    left: 20,
    height: 50,
    width: 100,
  },
})
