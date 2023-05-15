import { View, Text } from "react-native";
import React from "react";

const Header2 = (props) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          color: "white",
        }}
      >
        {props.name}
      </Text>
    </View>
  );
};

export default Header2;
