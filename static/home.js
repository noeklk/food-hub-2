import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, ActivityIndicator, View, Text, Button } from 'react-native';

import ListItem from "../components/list-item";

import { fetchFiveRandomProducts, MAX_PRODUCT_RESULT } from "../services/food-fact";

const Home = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(false);

    const updateHandler = () => {
        setUpdate(!update);
    }

    useEffect(() => {
        (async () => {
            let products = await fetchFiveRandomProducts();
            setProducts(products);
            setLoading(false);
        })()
    }, [update]);

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, padding: 20 }}>
                <View>
                    <ActivityIndicator />
                </View>
            </SafeAreaView>
        )
    }
    else {
        return (
            <SafeAreaView style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end'
            }}>
                <Text style={{ textAlign: "center", fontSize: 25, backgroundColor: "#2196F3", color: "white", height: 35 }}>{MAX_PRODUCT_RESULT} produits au hasard à découvrir</Text>
                <FlatList
                    keyExtractor={(item, i) => i.toString()}
                    data={products}
                    renderItem={({ item }) =>
                        < ListItem item={item} navigation={props.navigation} />
                    }
                />
                <Button title="Rafraîchir" onPress={() => updateHandler()} />
            </SafeAreaView>
        );
    }

}

export default Home;

