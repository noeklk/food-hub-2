import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import Home from './static/home';
import History from './static/history';
import Scanner from './static/scanner';
import Item from './static/item';

import { fetchFiveRandomProducts } from "./services/food-fact";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Item" component={Item} />
    </Stack.Navigator>
  )
}

const ScannerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="Item" component={Item} />
    </Stack.Navigator>
  )
}

const HistoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Item" component={Item} />
    </Stack.Navigator>
  )
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  // 3274080005003 Cristaline

  async componentDidMount() {
    await fetchFiveRandomProducts();
  }

  render = () => {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarLabel: 'Accueil',
              tabBarIcon: () => <Icon name="home" size={24} type="font-awesome" />,
            }}
          />
          <Tab.Screen
            name="Scanner"
            component={ScannerStack}
            options={{
              tabBarLabel: 'Scanner',
              tabBarIcon: () => <Icon name="search" size={24} type="font-awesome" />,
            }}
          />

          <Tab.Screen
            name="History"
            component={HistoryStack}
            options={{
              tabBarLabel: 'Historique',
              tabBarIcon: () => <Icon name="history" size={24} type="font-awesome" />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
