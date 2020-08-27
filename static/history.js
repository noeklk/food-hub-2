import React, { useState, useEffect } from "react";
import { AsyncStorage, SafeAreaView, FlatList, Button } from "react-native";
import ListItem from "../components/list-item";

const History = (props) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        (async () => {
            await _updateHistory();
        })()
    }, [])

    const _updateHistory = async () => {
        const cacheHistory = await AsyncStorage.getItem("data");
        if (cacheHistory == null) return;
        if (history == cacheHistory) return;
        setHistory(JSON.parse(cacheHistory));
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end'
        }}>
            <FlatList
                keyExtractor={(item, i) => i.toString()}
                data={history}
                renderItem={({ item }) =>
                    <ListItem item={item} navigation={props.navigation} />
                }
            />
            <Button title="Rafraîchir" onPress={async () => await _updateHistory()} />
        </SafeAreaView>
    );
}

export default History;