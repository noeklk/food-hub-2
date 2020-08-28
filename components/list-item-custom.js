import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ListItem, Avatar, Badge } from "react-native-elements";

import { badgeRender } from "../helpers/grade-helper";

const ListItemCustom = (props) => {

    const { item } = props;
    const { navigation } = props;

    const _onPress = (item) => {
        navigation.navigate('item-details',
            {
                product: item
            }
        )
    }

    return (
        <View>
            <ListItem bottomDivider onPress={() => _onPress(item)}>
                <Avatar source={{ uri: item.image_url }} size="large" renderPlaceholderContent={(<ActivityIndicator />)} rounded />
                <ListItem.Content>
                    <ListItem.Title>
                        {item.product_name}
                    </ListItem.Title>
                </ListItem.Content>
                <Badge {...badgeRender(item.grade)} />
                <ListItem.Chevron />
            </ListItem>
        </View>
    )
}

export default ListItemCustom;