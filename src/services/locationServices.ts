import * as Location from 'expo-location'

export const getGPSCoordinates = async () => {
  try {
    const { granted: isGPSPermissionGranted } = await Location.getForegroundPermissionsAsync()
    if (isGPSPermissionGranted) {
      const location = await Location.getCurrentPositionAsync({})

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
    }
    return null
  } catch (error) {
    __DEV__ && console.log(error)
    return null
  }
}
