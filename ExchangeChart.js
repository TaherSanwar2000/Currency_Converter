import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const ExchangeRateChart = ({route}) => {
  const [exchangeRates, setExchangeRates] = useState([]);

  const {sourceCurrency,targetCurrency} = route.params;

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          `https://api.apilayer.com/exchangerates_data/timeseries?end_date=2023-05-10&start_date=2023-05-07&base=${sourceCurrency}&symbols=${targetCurrency}`,
          {
            headers: {
              apikey: 'in5CYGySxVuxYxqlggYqej0dh7QXIlwL',
            },
          },
        );
        const data = await response.json();
        console.log(data)
        const rates = data.rates;
        const chartData = Object.keys(rates).map((date) => ({
          date: date,
          value: rates[date][targetCurrency],
        }));
        setExchangeRates(chartData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExchangeRates();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exchange Rates between 1 {sourceCurrency} to {targetCurrency}.. </Text>
      {exchangeRates.length > 0 ? (
        <LineChart
          data={{
            labels: exchangeRates.map((rate) => rate.date),
            datasets: [
              {
                data: exchangeRates.map((rate) => rate.value),
                color: () => '#66B2FF',
              },
            ],
          }}
          width={350}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
            color: () => '#1E90FF',
            style: {
              borderRadius: 16,
            },
          }}
        />
      ) : (
        <Text>Loading exchange rates...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ExchangeRateChart;
