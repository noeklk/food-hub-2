import React from "react";
import { SafeAreaView, FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';

import ListItem from "../components/list-item";

import { fetchFiveRandomProducts } from "../services/food-fact";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true,
        };
    }

    async componentDidMount() {
        let products = await fetchFiveRandomProducts();
        this.setState({ products: products, loading: false });
    }

    render = () => {
        if (this.state.loading) {
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
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={this.state.products}
                        renderItem={({ item }) => <ListItem item={item} navigation={this.props.navigation} />}
                        keyExtractor={({ id }, index) => id}
                    />
                </SafeAreaView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        padding: 5,
        justifyContent: "center",
        height: "100%",
        flexDirection: "row",
        backgroundColor: "lightgrey"
    }
});