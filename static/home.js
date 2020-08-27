import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, ActivityIndicator, View } from 'react-native';
import { Text, Button } from 'react-native-elements';

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
                <Text h4 h4Style={{ fontSize: 23, textAlign: "center", color: "white" }}>{MAX_PRODUCT_RESULT} produits au hasard à découvrir</Text>
            </View>
            {loading ?
                <SafeAreaView style={{ flex: 1, padding: 20 }}>
                    <View>
                        <ActivityIndicator />
                    </View>
                </SafeAreaView>
                :
                <FlatList
                    keyExtractor={(item, i) => i.toString()}
                    data={products}
                    renderItem={({ item }) =>
                        < ListItem item={item} navigation={props.navigation} />
                    }
                />
            }
            <Button title="Actualiser" onPress={() => updateHandler()} />
        </SafeAreaView>
    );


}

export default Home;

