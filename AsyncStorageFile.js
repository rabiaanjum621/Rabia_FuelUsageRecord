import AsyncStorage from '@react-native-async-storage/async-storage'
function fuelStore(){
    let fuelData = [
        {
            fuelType: "Petrol",
            pricePerLiter: 30
        },
        {
            fuelType: "Diesel",
            pricePerLiter: 40
        },
        {
            fuelType: "Battery Charge",
            pricePerLiter: 10
        },
    ]
    AsyncStorage.setItem("fuelData", JSON.stringify(fuelData))
    AsyncStorage.setItem("userMaxAllowance", JSON.stringify(300))
}

const getFuelDataStore = (callback) => {
    try {
      AsyncStorage.multiGet(["fuelData", "userMaxAllowance"]).then((savedData) => {
        const data = Object.fromEntries(savedData);
        let finalData = {
          fuelData: JSON.parse(data.fuelData),
          userMaxAllowance: parseInt(data.userMaxAllowance)
        }
        callback(finalData)
      })
    } catch (error) {
      console.log(error);
    }
  };

export {fuelStore, getFuelDataStore}