import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeModules } from "react-native";

const { ReactOneCustomMethod } = NativeModules;
const fuelStore = () => {
  ReactOneCustomMethod.getFuelData().then((res) => {
    AsyncStorage.setItem("fuelData", JSON.stringify(res.data));
    AsyncStorage.setItem(
      "userMaxAllowance",
      JSON.stringify(res.userMaxAllowance)
    );
  });
};

const getFuelDataStore = (callback) => {
  try {
    AsyncStorage.multiGet(["fuelData", "userMaxAllowance"]).then(
      (savedData) => {
        const data = Object.fromEntries(savedData);
        let finalData = {
          fuelData: JSON.parse(data.fuelData),
          userMaxAllowance: parseInt(data.userMaxAllowance),
        };
        callback(finalData);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export { fuelStore, getFuelDataStore };
