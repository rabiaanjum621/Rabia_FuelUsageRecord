import { View, Text, StyleSheet, NativeModules } from 'react-native';
import React, { useState, useEffect } from "react";
const ShowDeviceInfo = (props) => {

    const [getDeviceInfo, setDeviceInfo] = useState({});
    const { ReactOneCustomMethod } = NativeModules;

    useEffect(() => {
        ReactOneCustomMethod.getDeviceInfo()
            .then((res) => {
                setDeviceInfo(res);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <View style={styles.formWrapper}>
            <Text style={styles.textStyle} >Unique Device ID: {getDeviceInfo.Id}</Text>
            <Text style={styles.textStyle} >Device Type / Manufacturer: {getDeviceInfo.Manufacturer}</Text>
            <Text style={styles.textStyle} >Device Name: {getDeviceInfo.Device}</Text>
            <Text style={styles.textStyle} >Device Model: {getDeviceInfo.Model}</Text>
            <Text style={styles.textStyle} >System Version: {getDeviceInfo.OS_VERSION ? getDeviceInfo.OS_VERSION : getDeviceInfo.versionCode}</Text>
            <Text style={styles.textStyle} >Device Locale Language: {getDeviceInfo.language}</Text>
            <Text style={styles.textStyle} >Build Number: {getDeviceInfo.versionName}</Text>
            <Text style={styles.textStyle} >Bundle ID: {getDeviceInfo.versionCode}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    formWrapper: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        padding: 30,
        backgroundColor: '#f4f4f4',
        flexDirection: "column",
    },
    textStyle: {
        marginVertical: 10,
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
});

export default ShowDeviceInfo;