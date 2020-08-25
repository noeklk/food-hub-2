import React from "react";
import { View, Text, Image } from "react-native";

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{this.props.route.params.product.product_name}</Text>
                <Image
                    source={{ uri: this.props.route.params.product.image_small_url }}
                    style={{ alignSelf: 'center', width: 200, height: 200, borderRadius: 200 }}
                />
            </View>
        );
    }
}