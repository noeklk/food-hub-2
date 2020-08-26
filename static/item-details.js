import React from "react";
import { View, Text, Image } from "react-native";

const ItemDetails = ({ route }) => {

    const { params } = route;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{params.product.product_name}</Text>
            <Image
                source={{ uri: params.product.image_small_url }}
                style={{ alignSelf: 'center', width: 200, height: 200, borderRadius: 200, resizeMode: "contain" }}
            />
        </View>
    );

}

export default ItemDetails;