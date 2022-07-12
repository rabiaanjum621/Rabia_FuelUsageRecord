import React, { useState, useEffect } from "react";
import {
 Text,
  View,
  TextInput,
  StyleSheet,
  NativeModules
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { getFuelDataStore } from "../AsyncStorageFile";
import Btn from "../components/Btn";
import { useNavigation, useRoute } from "@react-navigation/native";

const CreateList = (props) => {
  const [inputValue, setInputValue] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const [getFuelData, setFuelData] = useState([]);
  const [getBalance, setBalance] = useState();
  const [item, setItem] = useState();
  const { ReactOneCustomMethod } = NativeModules;


  useEffect(() => {
    getFuelDataStore((finalData) => {
     setBalance(route.params.userMaxAllowance)
     console.log("final data " + route.params.userMaxAllowance);
        setItem({ label: finalData.fuelData[0].fuelType, value: finalData.fuelData[0].pricePerLiter });
        setFuelData(finalData.fuelData.map((obj) => { return { label: obj.fuelType, value: obj.pricePerLiter.toString() } }))
    })
}, []);

  const createItem =() =>{
    let total = parseFloat(inputValue) * item.value;
    let obj = {
      userMaxAllowance: getBalance,
      total: total
  }
  ReactOneCustomMethod.checkBalance(obj)
      .then((res) => {
          if (res) {
              let data = {
                  id: Date.now() + Math.random(),
                  type: item.label,
                  price: total,
                  quantity: parseFloat(inputValue)
              }
              
              route.params.handleAddFuel({ data })
              alert("Item Added successfully")
              navigation.navigate("ListPage")
          } else {
              alert("You are running out of balance")
          }
      });
}


  return (
    <View style={styles.formWrapper}>
      <DropDownPicker
                items={getFuelData}
                defaultIndex={0}
                placeholder = "Fuel Type"
                containerStyle={{ height: 40 }}
                onChangeItem={item => setItem(item)}
            />
      <TextInput
        placeholderTextColor={"black"}
        placeholder="Enter Liters/ Charge unit here"
        style={styles.textInputStyle}
        keyboardType="numeric"
        value={inputValue}
        onChangeText={(val) => setInputValue(val)}
      />
      <Btn title="Create" onClick={() => createItem()}/>
    </View>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#f4f4f4",
    flexDirection: "column",
  },
  textInputStyle: {
    marginVertical: 20,
    height: 40,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
  },
  btn: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 5,
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateList;