import React, { useState, useEffect, useLayoutEffect } from "react";
import { AsyncStorage, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { Button } from 'react-native-elements';
import ListItem from "../components/list-item";
import { Icon } from 'react-native-elements';

const History = ({ navigation }) => {
    const [history, setHistory] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ right: 10 }} onPress={async () => await clearCache()}  >
                    <Icon
                        name="md-trash"
                        size={30}
                        style={{ borderRadius: 20, width: 30 }}
                        type="ionicon"
                    />
                </TouchableOpacity>
            )
        })
    })

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
                    <ListItem item={item} navigation={navigation} />
                }
            />
        </SafeAreaView>
    );
}

export default History;