import React, { useState, useEffect } from "react";
import { AsyncStorage, SafeAreaView, FlatList } from "react-native";
import { Button } from 'react-native-elements';
import ListItem from "../components/list-item";

const History = (props) => {
    const [history, setHistory] = useState([]);

    const getCacheData = async () => await AsyncStorage.getItem("data");

    const _updateHistory = async () => {
        const cacheHistory = await getCacheData();
        if (cacheHistory == null) return;
        if (history == cacheHistory) return;
        setHistory(JSON.parse(cacheHistory));
    }

    useEffect(() => {
        (async () => {
            await _updateHistory();
        })()
    }, [])

    const clearCache = async () => {
        await AsyncStorage.clear();
        setHistory([]);
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
            <Button title="Vider mon historique" onPress={async () => await clearCache()} />
        </SafeAreaView>
    );
}

export default History;