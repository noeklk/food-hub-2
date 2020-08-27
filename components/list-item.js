import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ListItem as ReactListItem } from "react-native-elements";

import { badgeRender } from "../helpers/grade-helper";

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
                    pad={30}
                    leftAvatar={{ source: { uri: item.image_url }, size: "large" }}
                    title={item.product_name}
                    bottomDivider
                    chevron
                    badge={badgeRender(item.grade)}
                    titleStyle={{ fontSize: 14 }}
                >
                </ReactListItem>
            </TouchableOpacity>
        </View>
    )
}

export default ListItem;