import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Home from './static/home';
import History from './static/history';
import Scanner from './static/scanner';
import ItemDetails from './static/item-details';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: "white",
      headerStyle: { backgroundColor: '#63954b' },
      headerTitleAlign: "center"

    }}>
      <Stack.Screen options={{
        title: "Accueil"
      }} name="Home" component={Home} />
      <Stack.Screen options={{ title: "Produit" }} name="item-details" component={ItemDetails} />
    </Stack.Navigator>
  )
}

const ScannerStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: "white",
      headerStyle: { backgroundColor: "#63954b" },
      headerTitleAlign: "center"
    }}>
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen options={{ title: "Produit" }} name="item-details" component={ItemDetails} />
    </Stack.Navigator>
  )
}

const HistoryStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: "white",
      headerStyle: { backgroundColor: '#63954b' },
      headerTitleAlign: "center"
    }}>
      <Stack.Screen options={{ title: "Historique" }} name="History" component={History} />
      <Stack.Screen options={{ title: "Produit" }} name="item-details" component={ItemDetails} />
    </Stack.Navigator>
  )
}

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: "Accueil",
            tabBarIcon: () => <Icon name="md-home" size={24} type="ionicon" />,
          }}
        />
        <Tab.Screen
          name="Scanner"
          component={ScannerStack}
          options={{
            tabBarLabel: "Scanner",
            tabBarIcon: () => <Icon name="md-qr-scanner" size={24} type="ionicon" />,
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryStack}
          options={{
            unmountOnBlur: true,

            tabBarLabel: 'Historique',
            tabBarIcon: () => <Icon name="history" size={24} type="font-awesome" />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
