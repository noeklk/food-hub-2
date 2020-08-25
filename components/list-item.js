import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableHighlight } from 'react-native';


export default class ListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    _onPress = (item) => {
        this.props.navigation.navigate('Item',
            {
                product: item
            }
        )
    }

    render = () => {
        return (
            <View>
                <TouchableOpacity onPress={() => this._onPress(this.props.item)}>
                    <View style={{
                        height: 100, backgroundColor: "white", borderColor: "black", borderWidth: 1, borderRadius: 5, marginBottom: 5,
                        flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                    }}>

                        <Image
                            source={{ uri: this.props.item.image_small_url }}
                            style={{ width: 70, height: 70, borderRadius: 70, marginLeft: 5 }}
                        />

                        <Text style={{ fontSize: 18, marginRight: 5 }}>{this.props.item.product_name}</Text>
                    </View>

                </TouchableOpacity>
            </View>
        )
    }

}