
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/Login"
import ListPage from "./screens/ListPage"
import CreateList from "./screens/CreateList";
import ShowDeviceInfo from "./screens/ShowDeviceInfo"
import SignUpScreen from "./screens/SignUp"
import {getDatabase} from "firebase/database"
import { createStore } from "redux";
// import fuelReducer from "./Reducer/countReducer";
import {app, auth} from "./firebase"
// import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator();
export default function App() {
 
  // const store =  createStore(fuelReducer)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const database = getDatabase(app);
  return (

    <NavigationContainer>
      {
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ListPage" component={ListPage} />
          <Stack.Screen name="CreateList" component={CreateList} />
          <Stack.Screen name="ShowDeviceInfo" component={ShowDeviceInfo} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
        }
    </NavigationContainer>

  );
      }

