import React, { useEffect, useState, useLayoutEffect } from "react";
import { SafeAreaView, FlatList, ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { Icon, Text } from 'react-native-elements';

import ListItemCustom from "../components/list-item-custom";

import { fetchFiveRandomProducts } from "../services/food-fact";

const Home = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ right: 10 }} onPress={() => updateHandler()} >
                    <Icon
                        name="md-refresh"
                        size={30}
                        style={{ borderRadius: 20, width: 30 }}
                        type="ionicon"
                    />
                </TouchableOpacity>
            )
        })
    })

    const updateHandler = () => {
        setUpdate(!update);
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            let products = await fetchFiveRandomProducts();
            setProducts(products);
            setLoading(false);
        })()
    }, [update]);

    return (
        <SafeAreaView style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end'
        }}>
            <View style={{ backgroundColor: "#2196F3" }}>
            </View>
            {loading ?
                <SafeAreaView style={{ flex: 1, padding: 20 }}>
                    <View>
                        <ActivityIndicator color="blue" />
                    </View>
                </SafeAreaView>
                :
                <FlatList
                    keyExtractor={(item, i) => i.toString()}
                    data={products}
                    renderItem={({ item }) =>
                        <ListItemCustom item={item} navigation={navigation} />
                    }
                />
            }
        </SafeAreaView>
    );
}

export default Home;

