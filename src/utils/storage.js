import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@daily-todo', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  export const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@daily-todo')
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch(e) {
      // error reading value
    }
  }

  export const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@daily-todo')
    } catch(e) {
      // remove error
    }
  }