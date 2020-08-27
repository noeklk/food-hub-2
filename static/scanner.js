import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button, AsyncStorage } from "react-native";
import { Camera } from 'expo-camera';
import { Icon } from 'react-native-elements';

import { useIsFocused } from '@react-navigation/native';

import { fetchDataByBarCode } from '../services/food-fact';
import { BarCodeScanner } from "expo-barcode-scanner";

const Scanner = (props) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [product, setProduct] = useState({});
    const [torch, setTorch] = useState(Camera.Constants.FlashMode.off);
    const [notValidProductMessage, setNotValidProductMessage] = useState(null);
    const [errorMessageToggle, setErrorMessageToggle] = useState(false);

    const torchOff = Camera.Constants.FlashMode.off;
    const torchOn = Camera.Constants.FlashMode.torch;
    const setTorchOff = () => setTorch(torchOff);
    const setTorchOn = () => setTorch(torchOn);
    const torchHandler = () => torch === torchOff ? setTorchOn() : setTorchOff();

    props.navigation.addListener('blur', () => {
        setTorchOff();
    });

    const isFocused = useIsFocused();

    const { navigation } = props;

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setErrorMessageToggle(false);
        setScanned(true);
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

        const product = await fetchDataByBarCode(data);

        if (product.status === 1) {
            setProduct(product);
            await _storeData(product);

        } else if (product.status === 0) {
            setNotValidProductMessage(product.message);
            setErrorMessageToggle(true);
        } else {
            setNotValidProductMessage("Erreur non répertorié");
            setErrorMessageToggle(true);
        }

    };

    const handleViewProduct = () => {
        setScanned(true);

        navigation.navigate('Item',
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

    const _storeData = async (inputData) => {
        try {
            const persistingData = await AsyncStorage.getItem("data");

            if (persistingData == null) {
                await AsyncStorage.setItem("data", JSON.stringify([inputData]));
                return;
            }

            const jsonParse = JSON.parse(persistingData);

            if (checkDoesNotContainsData(jsonParse, inputData)) {
                jsonParse.push(inputData);
                let jsonStringify = JSON.stringify(jsonParse)

                await AsyncStorage.setItem("data", jsonStringify);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
            }}>
            {isFocused &&
                <Camera
                    style={{ flex: 1 }}
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
                            position: "absolute",
                            width: "25%",
                            bottom: "15%",
                            alignSelf: "center"
                        }}>
                        <TouchableOpacity
                            activeOpacity={0.9}

                            onPress={() => torchHandler()}>
                            <Icon name="flash" backgroundColor={torch === torchOn ? "white" : "rgba(211,211,211, 0.4);"} borderRadius={50} size={100} type="font-awesome" />
                        </TouchableOpacity>
                    </View>
                </Camera>}

            {(scanned && !errorMessageToggle) && <Button title={"Voir le produit scanné"} onPress={() => handleViewProduct(false)} />}
            {scanned && <Button title={"Appuyer pour scanner encore"} onPress={() => setScanned(false)} />}
            {(errorMessageToggle && scanned) && <Button disabled={true} title={notValidProductMessage} color="tomato" onPress={() => setScanned(false)} />}
        </View>
    );

}

export default Scanner;
