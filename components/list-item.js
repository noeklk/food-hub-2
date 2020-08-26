import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ListItem as ReactListItem } from "react-native-elements";

import GradeRender from "./grade-render";

const ListItem = (props) => {

    const { item } = props;
    const { navigation } = props;

    const _onPress = (item) => {
        navigation.navigate('Item',
            {
                product: item
            }
        )
    }

    return (
        <View>
            <TouchableOpacity onPress={() => _onPress(item)}>
                <ReactListItem
                    leftAvatar={{ source: { uri: item.image_small_url }, size: "large" }}
                    title={item.product_name}
                    subtitle={<GradeRender size={14} grade={item.grade} />}
                    bottomDivider
                    chevron
                />
            </TouchableOpacity>
        </View>
    )
}

export default ListItem;