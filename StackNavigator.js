import { createStackNavigator } from "@react-navigation/stack";
import Navigator from "./Navigator";
import ExchangeChart from "./ExchangeChart";
import Header2 from "./Header2";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#109dcb", height: 90 },
      }}
    >
      <Stack.Screen
        name="HomeStack"
        component={Navigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Exchange"
        component={ExchangeChart}
        options={{
          headerTitle: () => <Header2 name="Exchange Rate Chart" />,
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
};
export default MyStack;
