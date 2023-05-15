import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from '@expo/vector-icons'; 


const Favrt = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem("watchlist");
      if (data !== null) {
        const parsedData = JSON.parse(data);
        setData(parsedData);
      }
    } catch (error) {
      console.log("Error retrieving data: ", error);
    }
  };

  const removeItem = async () => {
    try {
      await AsyncStorage.clear();
      setData(null); // Update the state to reflect the removal
      console.log("Item successfully removed from AsyncStorage", data);
    } catch (error) {
      console.error("Error removing item from AsyncStorage:", error);
    }
  };
  const renderItem = ({ item }) => (
    <View
      key={item}
      style={{
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {item.sourceCurrency}
      </Text>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 5 }}>
        {item.sourceAmount}{" "}
      </Text>
      <AntDesign name="arrowright" size={20} />
      <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 5 }}>
        {item.targetCurrency}
      </Text>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 5 }}>
        {item.targetAmount}
      </Text>
    </View>
  );

  useEffect(() => {
    loadData();
  });
  return (
    <View style={{ flex: 1 }}>
      {data == null ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text style={{ fontSize: 25 }}>No Favourites Found</Text>
        </View>
      ) : (
        <FlatList data={data} renderItem={renderItem} />
      )}
      <View>
        <TouchableOpacity
        onPress={removeItem}
          style={{
            position: "absolute",
            width: 80,
            height: 80,
            alignItems: "center",
            justifyContent: "center",
            right: 20,
            bottom: 30,
            backgroundColor: "#109dcb",
            borderRadius: 40,
          }}
        >
          <FontAwesome name="remove" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Favrt;
