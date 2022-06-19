import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import TextBox from "../components/TextBox";
import Btn from "../components/Btn";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, getDatabase } from "firebase/database";
import {app, auth} from "../firebase"

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function SignUpScreen({ navigation }) {
  const [values, setValues] = useState({
    email: "",
    pwd: "",
    pwd2: "",
    userName: ""
  });

  function insertData() {
    const { email, userName, gender, location, occupation, phone } = values;
    const userId = auth.currentUser.uid;
    const db = getDatabase();
    set(ref(db, "user/" + userId), {
      userName: userName,
      email: email,
    })
      .then(() => {
        alert("sign up successfully");
      })
      .catch((error) => {
        alert("sign up failed " + error);
      });
  }

  function handleChange(text, eventName) {
    setValues((prev) => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  }

  function SignUp() {
    const { email, pwd, pwd2 } = values;

    if (pwd == pwd2) {
      createUserWithEmailAndPassword(auth, email, pwd)
        .then(() => { 
            insertData();
            navigation.navigate("Login");
        })
        .catch((error) => {
          alert(error.message);
          // ..
        });
    } else {
      alert("Passwords are different!");
    }
  }

  return (
    <View style={styles.view}>
      <Text style={{ fontSize: 28, fontWeight: "800", marginBottom: 10 }}>
        Sign Up
      </Text>
      <TextBox
        placeholder="Name"
        onChangeText={(text) => handleChange(text, "userName")}
      />
      <TextBox
        placeholder="Email Address"
        onChangeText={(text) => handleChange(text, "email")}
      />
      <TextBox
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => handleChange(text, "pwd")}
      />
      <TextBox
        placeholder="Confirme Password"
        secureTextEntry={true}
        onChangeText={(text) => handleChange(text, "pwd2")}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "92%",
        }}
      >
        <Btn
          onClick={() => SignUp()}
          title="Sign Up"
          style={{ width: "48%" }}
        />
        <Btn
          onClick={() => navigation.replace("Login")}
          title="Login"
          style={{ width: "48%", backgroundColor: "#344869" }}
        />
      </View>
    </View>
  );
}
