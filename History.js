import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const History = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const removeItem = async () => {
    try {
      await AsyncStorage.clear();
      setData(null); // Update the state to reflect the removal
      console.log("Item successfully removed from AsyncStorage", data);
    } catch (error) {
      console.error("Error removing item from AsyncStorage:", error);
    }
  };

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem("myData");
      if (data !== null) {
        const parsedData = JSON.parse(data);
        setData(parsedData);
        console.log("History",data)
      }
    } catch (error) {
      console.log("Error retrieving data: ", error);
    }
  };

  useEffect(() => {
    loadData();
  },[]);

  return (
    <View style={{ flex: 1 }}>
      {data == null ? (
        <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
          <Text style={{fontSize:25}}>No Recent History Found</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Pressable
              key={item}
              onPress={() =>
                navigation.navigate("Exchange", {
                  sourceCurrency: item.sourceCurrency,
                  targetCurrency: item.targetCurrency,
                })
              }
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
                {item.sourceAmount}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 5 }}>
                {item.sourceCurrency}{" "}
              </Text>
              <AntDesign name="arrowright" size={20} />
              <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 5 }}>
                {item.targetAmount}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 5 }}>
                {item.targetCurrency}
              </Text>
            </Pressable>
          )}
        />
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
          <AntDesign name="delete" color="white" size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default History;
