import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import History from "./History";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View, Text } from "react-native";
import Header from "./Header";
import Favrt from "./Favrt";

const Navigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#109dcb", height: 60 },
        headerStyle: { backgroundColor: "#109dcb", height: 80 },
        headerTitleAlign: 'left',
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={CurrencyConverter}
        options={{
          headerTitle: () => <Header name="Home" />,
          tabBarIcon: () => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("./assets/home.png")}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: 12,

                  fontWeight: "bold",
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          headerTitle: () => <Header name="History" />,
          tabBarIcon: () => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("./assets/history.png")}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: 12,

                  fontWeight: "bold",
                }}
              >
                History
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favrt}
        options={{
          headerTitle: () => <Header name="Favourite" />,
          tabBarIcon: () => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("./assets/favourites.png")}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: 12,

                  fontWeight: "bold",
                }}
              >
                Favourite
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigator;
