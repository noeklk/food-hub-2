import React from "react";
import { Text, Image, Badge } from "react-native-elements";
import { View } from "react-native";
import { GradeRender, badgeRender } from "../helpers/grade-helper";

const ItemDetails = ({ route }) => {

    const { params } = route;
    const { product } = params;

    return (
        <View style={{ flex: 1, alignItems: 'center', flexDirection: "column" }}>

            <Text h4 h4Style={{ fontSize: 20 }}>{product.product_name}</Text>
            <Badge {...badgeRender(product.grade)} />
            <Image
                height={200}
                width={200}
                source={{ uri: product.image_url }}
                style={{ alignSelf: 'center', width: 200, height: 200, resizeMode: "contain" }}
            />


        </View>
    );

}

export default ItemDetails;