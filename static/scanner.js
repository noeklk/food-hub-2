import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, AsyncStorage, SafeAreaView, ActivityIndicator, Modal, Switch } from "react-native";
import { Button, Icon, Card } from 'react-native-elements';
import { Camera } from 'expo-camera';

import { useIsFocused } from '@react-navigation/native';

import { fetchDataByBarCode } from '../services/food-fact';
import { BarCodeScanner } from "expo-barcode-scanner";

import Svg, { Path } from 'react-native-svg';

const Scanner = (props) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [product, setProduct] = useState({});
    const [torch, setTorch] = useState(Camera.Constants.FlashMode.off);
    const [notValidProductMessage, setNotValidProductMessage] = useState(null);
    const [checked, setChecked] = useState(false);
    const [isValidScannedProduct, setIsValidScannedProduct] = useState(false);

    const isFocused = useIsFocused();

    const torchOff = Camera.Constants.FlashMode.off;
    const torchOn = Camera.Constants.FlashMode.torch;
    const setTorchOff = () => setTorch(torchOff);
    const setTorchOn = () => setTorch(torchOn);
    const torchHandler = () => torch === torchOff ? setTorchOn() : setTorchOff();

    const onCheckedChange = (isChecked) => {
        torchHandler();
        setChecked(previousState => !previousState);
    };

    const { navigation } = props;

    navigation.addListener('blur', () => {
        setChecked(false);
        setTorchOff();
    });

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        try {
            const product = await fetchDataByBarCode(data);
            setScanned(true);

            if (product.status === 1) {
                setIsValidScannedProduct(true);
                setProduct(product);
                await storeData(product);

            } else if (product.status === 0) {
                setNotValidProductMessage(product.message);
            } else {
                setNotValidProductMessage("Erreur non référencé");
            }
        } catch (e) {
            setNotValidProductMessage("Erreur non répertorié");
        }
    };

    const handleViewProduct = () => {
        navigation.navigate('item-details',
            {
                product
            }
        )
    };

    const checkDoesNotContainsData = (persistingData, inputData) => {
        for (let i = 0; i < persistingData.length; i++) {
            if (persistingData[i].code == inputData.code) {
                return false;
            }
        }

        return true;
    }

    const storeData = async (inputData) => {
        try {
            const persistingData = await AsyncStorage.getItem("data");

            if (persistingData == null) {
                await AsyncStorage.setItem("data", JSON.stringify([inputData]));
                return;
            }

            const jsonParsePersistingData = JSON.parse(persistingData);

            if (checkDoesNotContainsData(jsonParsePersistingData, inputData)) {
                jsonParsePersistingData.push(inputData);
                let jsonStringify = JSON.stringify(jsonParsePersistingData)

                await AsyncStorage.setItem("data", jsonStringify);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    const resetScan = () => {
        setScanned(false);
        setNotValidProductMessage(null);
        setIsValidScannedProduct(false);
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    if (!isFocused) {
        return <SafeAreaView><ActivityIndicator /></SafeAreaView>
    }
    return (
        <View
            style={{
                flex: 3,
                flexDirection: 'column',
                justifyContent: "flex-end"
            }}>
            <Camera
                type={Camera.Constants.Type.back}
                ratio={"16:9"}
                flashMode={torch}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                barCodeScannerSettings={{
                    barCodeTypes: [BarCodeScanner.Constants.BarCodeType.ean13, BarCodeScanner.Constants.BarCodeType.ean8]
                }}
                style={StyleSheet.absoluteFillObject}
            >
                <View
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        flexDirection: "row",
                        right: 20,
                        top: 25
                    }}>
                    <Switch value={checked}
                        onValueChange={onCheckedChange}
                        ios_backgroundColor="#FFF"

                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={checked ? "#f5dd4b" : "#f4f3f4"} />
                    <Icon name="ios-flash" size={25} type="ionicon" color="white" />
                </View>
                <View
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        top: "20%",

                    }}>
                    <Svg width="400" height="600">
                        <Path d="M50,5 h300 a20,20 0 0 1 20,20 v200 a20,20 0 0 1 -20,20 h-300 a20,20 0 0 1 -20,-20 v-200 a20,20 0 0 1 20,-20 z" fill="none" stroke="white" stroke-width="4" />
                    </Svg>

                </View>
                <Modal animationType="fade" transparent visible={notValidProductMessage != null}  >
                    <View style={{
                        flex: 1,
                        position: "absolute",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        top: "34%",
                        left: "22%",
                        width: 225,
                        height: 125,
                        backgroundColor: "white",
                        borderRadius: 10
                    }}>
                        <Text style={{ marginBottom: 20 }}>{notValidProductMessage}</Text>
                        <Button onPress={() => setNotValidProductMessage(null)} title="Compris" color="#c62828" />
                    </View>
                </Modal>


            </Camera>
            <View style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: 40
            }}>
                {(scanned && isValidScannedProduct) &&
                    <View
                        style={{ width: "20%" }}>
                        <Button
                            buttonStyle={{ backgroundColor: "white" }}
                            icon={<Icon name="md-eye" size={50} type="ionicon" />}
                            type="solid"
                            onPress={() => handleViewProduct()}
                        />
                    </View>
                }
                {scanned &&
                    <View
                        style={{ width: "20%" }}>
                        <Button
                            buttonStyle={{ backgroundColor: "white" }}
                            icon={<Icon name="md-refresh" size={50} type="ionicon" />}
                            type="solid"
                            onPress={() => resetScan()}
                        />
                    </View>
                }
            </View>
        </View>
    );

}

export default Scanner;
