import React from "react";
import { View, Text, Image } from "react-native";
import GradeRender from "../components/grade-render";

const ItemDetails = ({ route }) => {

    const { params } = route;
    const { product } = params;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{product.product_name}</Text>
            <Image
                source={{ uri: product.image_small_url }}
                style={{ alignSelf: 'center', width: 200, height: 200, borderRadius: 200, resizeMode: "contain" }}
            />
            <GradeRender size={35} grade={product.grade} />
        </View>
    );

}

export default ItemDetails;