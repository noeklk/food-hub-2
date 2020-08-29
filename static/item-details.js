
import React from "react";
import { Text, Image, Badge, Card, Divider } from "react-native-elements";
import { View, ActivityIndicator } from "react-native";
import { badgeRender, NovaRender } from "../helpers/grade-helper";

const ItemDetails = ({ route }) => {

    const { params } = route;
    const { product } = params;

    return (
        <Card>
            <Card.Title>
                {product.product_name}
            </Card.Title>
            {product.image_url ? null :
                <Card.FeaturedTitle style={{ textAlign: "center", backgroundColor: "lightgrey" }}>
                    <Text style={{ color: "#232323" }}>Pas d'image fournie pour ce produit</Text>
                </Card.FeaturedTitle>
            }
            {product.image_url ?
                <Card.Image style={{ backgroundColor: "rgba(255,255,255,1)" }}>

                    <Image source={{ uri: product.image_url }} resizeMode="contain" style={{ width: "auto", height: "100%" }} PlaceholderContent={<ActivityIndicator />} />

                </Card.Image>
                : null
            }
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: 10, paddingTop: 10 }}>
                <Badge {...badgeRender(product.grade, true)} textStyle={{ width: 125, textAlign: "center" }} />
            </View>
            <Card.Divider />
            <View style={{ paddingBottom: 20, width: "80%", height: 75, flexDirection: "row", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
                <NovaRender nova={product.nova} />
            </View>
            <Card.Divider />
            <View style={{ paddingBottom: 10 }}>
                {product.image_nutrition_url ?
                    <Image source={{ uri: product.image_nutrition_url }} resizeMode="contain" style={{ width: "100%", height: 250 }} />
                    :
                    <Text style={{ textAlign: "center" }}>Pas de photo fournie pour la valeur nutritionelle</Text>
                }
            </View>
        </Card >

    );

}

export default ItemDetails;
