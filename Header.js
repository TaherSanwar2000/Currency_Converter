import { View, Text } from "react-native";
import React from "react";

const Header = (props) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "white",
          marginLeft: 20,
        }}
      >
        {props.name}
      </Text>
    </View>
  );
};

export default Header;
