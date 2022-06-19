import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import Btn from "../components/Btn";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {fuelStore} from "../AsyncStorageFile"
import { useNavigation } from "@react-navigation/native";


const ListPage =(props) =>{
  const navigations = useNavigation();
    let item = {
      type: "PETROL",
      price: 30,
      used: 1
  }
  const [getFuelList, setFuelList] = useState([]);
  const [getBalance, setBalance] = useState(300);
  const signMeOut = () => {
    signOut(auth);
    navigations.navigate("Login");
  };

    useEffect(() => {
      fuelStore()    
  },[]); 

  const removeItem = (item) => {
    let updatedList = getFuelList.filter((obj) => obj.id !== item.id)
        setFuelList(updatedList)
        let updatedBalance = getBalance + item.price;
        setBalance(updatedBalance)
        Alert.alert("Removed successfully")
}

  const _renderItem = ({ item }) => {
    return (
        <View style={styles.nestedView}>
            <View>
                <Text style={styles.textStyle}>Fuel Type: {item.type}</Text>
                <Text style={styles.textStyle}>Fuel Used: {item.used}</Text>
            </View>
            <View>
                <Text style={styles.textStyle}>Price: {item.price}</Text>
                <TouchableOpacity onPress={() => removeItem(item)}>
                    <Text style={styles.textStyle}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const handleAddFuel = (data) => {
  console.log("handleAddFuel");
  setBalance(data.finalBalance)
  let newItem = data.data
  setFuelList((prev) => [
      ...prev,
      {
          id: newItem.id,
          type: newItem.type,
          price: newItem.price,
          used: newItem.used
      }
  ])
}

  return (
    <View style={styles.view}>

        <Btn title="Create List"
        onClick={() =>  navigations.navigate('CreateList',
        { userMaxAllowance: getBalance, handleAddFuel: handleAddFuel })
  }
          style={{ width: "40%", backgroundColor: "#808080", borderRadius: 10, marginLeft:170}}/>
          <View style = {{marginLeft: 90, marginVertical: 10}}>
        <Text style={styles.textHeading}>User Allowance Remaining: {getBalance}</Text>
        </View>
        <FlatList
        data={getFuelList}
            renderItem={_renderItem}
        />

<Btn title="Log Out" onClick={signMeOut} />
    </View>
);
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
        display: "flex",
        padding: 15,
        backgroundColor: '#f4f4f4',
        flexDirection: "column",
  },
  nestedView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'grey',
    padding: 10,
    marginVertical: 10,
},
  textStyle: {
    marginVertical: 5,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
},
textHeading: {
  marginVertical: 5,
  color: 'black',
  fontSize: 18,
  fontWeight: 'bold'
},
});

export default ListPage;