import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, ToastAndroid } from "react-native";

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { fetchCurrencyLatest, convertCurrencyAPI } from "./api";
import { useNavigation } from "@react-navigation/native";

const CurrencyConverter = () => {
  const [currencyList, setCurrencyList] = useState([]);
  const [isopen, setIsOpen] = useState(false);
  const [targetOpen, setTargetOpen] = useState(false);
  const [sourceAmount, setSourceAmount] = useState("1");
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetAmount, setTargetAmount] = useState("0");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const navigation = useNavigation();

  const convertCurrency = async (amount, sourceCurrency, targetCurrency) => {
    setLoading(true);
    await convertCurrencyAPI(amount, sourceCurrency, targetCurrency).then(
      (data) => {
        const { rates } = data;
        setTargetAmount(String(rates[targetCurrency]));
        setLoading(false);
        handleSaveData(String(rates[targetCurrency]));
      }
    );
  };

  const handleSaveData = (targetAmount) => {
    const newData = {
      sourceAmount,
      sourceCurrency,
      targetAmount,
      targetCurrency,
    };
    const updatedData = [...data, newData];
    try {
      AsyncStorage.setItem("myData", JSON.stringify(updatedData));
      console.log("Data saved successfully.");
      setData(updatedData);
    } catch (error) {
      console.log("Error saving data: ", error);
    }
  };

  const AddToWatchlist = () => {
    const newData = {
      sourceAmount,
      sourceCurrency,
      targetAmount,
      targetCurrency,
    };
    const updatedData = [...data1, newData];
    try {
      AsyncStorage.setItem("watchlist", JSON.stringify(updatedData));
      console.log("Data saved successfully.fvrt");
      setData1(updatedData);
      ToastAndroid.show("Added to Watchlist", ToastAndroid.SHORT);
    } catch (error) {
      console.log("Error saving data: ", error);
    }
  };

  useEffect(() => {
    fetchCurrencyLatest().then((list) => setCurrencyList(list));
  }, []);

  const handlePress = () => {
    convertCurrency(sourceAmount, sourceCurrency, targetCurrency);
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <View>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10 }}>
          Source Amount
        </Text>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            marginTop: 5,
            borderWidth: 1,
            borderColor: "black",
          }}
        >
          <TextInput
            style={styles.textInput}
            onChangeText={(value) => setSourceAmount(value)}
            value={sourceAmount}
            keyboardType="numeric"
          />
        </View>

        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          Select Source Currency
        </Text>
        <View>
          <DropDownPicker
            style={isopen ? styles.space : styles.drop}
            onChangeText={(value) => setSourceCurrency(value)}
            open={isopen}
            value={sourceCurrency}
            items={currencyList.map((currency) => ({
              label: currency,
              value: currency,
            }))}
            setOpen={() => setIsOpen(!isopen)}
            setValue={setSourceCurrency}
            maxHeight={100}
          />
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          Target Amount
        </Text>
        <View
          style={{
            backgroundColor: "lightgray",
            borderRadius: 10,
            marginTop: 5,
          }}
        >
          <TextInput
            style={styles.textInput}
            editable={false}
            value={targetAmount}
          />
        </View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          Select Target Currency
        </Text>
        <DropDownPicker
          style={targetOpen ? styles.space : styles.drop}
          onChangeText={(value) => setTargetCurrency(value)}
          open={targetOpen}
          value={targetCurrency}
          items={currencyList.map((currency) => ({
            label: currency,
            value: currency,
          }))}
          setOpen={setTargetOpen}
          setValue={setTargetCurrency}
          maxHeight={100}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={AddToWatchlist} style={{ width: "50%" }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("./assets/favourites.png")}
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
            />
            <Text
              style={{
                marginTop: 5,
                marginLeft: 15,
                fontSize: 16,
                padding: 5,
                textAlign: "center",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Add To Watchlist
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 0.5,
            marginStart: 10,
            borderColor: "gray",
          }}
        ></View>
        <TouchableOpacity
          onPress={() => {
            {
              sourceCurrency.length > 0 && targetCurrency.length > 0 ? ( navigation.navigate("Exchange", {
              sourceCurrency,
              targetCurrency,}
            )): ToastAndroid.show("Please Select the Currency", ToastAndroid.SHORT);
            }
          }}
          style={{ width: "50%" }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("./assets/bar-graph.png")}
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
            />
            <Text
              style={{
                marginTop: 5,
                marginLeft: 15,
                fontSize: 16,
                width: "90%",
                padding: 5,
                textAlign: "center",

                color: "black",
                fontWeight: "bold",
              }}
            >
              See the Chart
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        {loading  ? (
          <ActivityIndicator
            color="#000000"
            size="large"
            style={{ marginTop: 100 }}
          />
        ) : (
          <TouchableOpacity onPress={handlePress}>
            <Text
              style={{
                marginTop: 110,
                marginLeft: 15,
                fontSize: 20,
                width: "90%",
                padding: 5,
                textAlign: "center",
                borderRadius: 10,
                backgroundColor: "#109dcb",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Covert
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default CurrencyConverter;

const styles = StyleSheet.create({
  textInput: {
    color: "black",
    marginLeft: 10,
    fontSize: 20,
    padding: 5,
  },
  space: {
    marginBottom: 110,
  },
  drop: {
    marginTop: 5,
    marginBottom: 10,
  },
});
