import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Dashboard = ({ navigation }) => {
  // Dummy data
  const expenseData = [
    { category: 'Seeds', name: 'Seed Purchase', price: 500 },
    { category: 'Fertilizer', name: 'Fertilizer Purchase', price: 300 },
    // Add more expense items as needed
  ];

  const earningsData = [
    { category: 'Tea Sales', name: 'Tea Product Sales', price: 1200 },
    { category: 'Harvesting', name: 'Harvesting Income', price: 800 },
    // Add more earnings items as needed
  ];

  // Calculate total for expenses and earnings
  const totalExpense = expenseData.reduce((sum, item) => sum + item.price, 0);
  const totalEarnings = earningsData.reduce((sum, item) => sum + item.price, 0);
  const netTotal = totalEarnings - totalExpense;

  const navigateToDataEntry = () => {
    navigation.navigate('DataEntry');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dashboard Screen</Text>

      <TouchableOpacity style={styles.section} onPress={() => navigateToDataEntry('expense')}>
        <Text style={styles.sectionHeading}>Expense Entry</Text>
        {expenseData.map((item, index) => (
          <Text key={index} style={styles.item}>
            {`${item.name}: ₹${item.price}`}
          </Text>
        ))}
        <Text style={styles.total}>Total Expense: ₹{totalExpense}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={() => navigateToDataEntry('earnings')}>
        <Text style={styles.sectionHeading}>Earnings Entry</Text>
        {earningsData.map((item, index) => (
          <Text key={index} style={styles.item}>
            {`${item.name}: ₹${item.price}`}
          </Text>
        ))}
        <Text style={styles.total}>Total Earnings: ₹{totalEarnings}</Text>
      </TouchableOpacity>

      <View style={styles.netTotalContainer}>
        <Text style={styles.netTotalHeading}>Net Total:</Text>
        <Text style={styles.netTotalValue}>₹{netTotal}</Text>
      </View>

      <TouchableOpacity style={styles.dataEntryButton} onPress={navigateToDataEntry}>
        <Text style={styles.buttonText}>Go to Data Entry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 40,
    color: 'green',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  netTotalContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  netTotalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  netTotalValue: {
    fontSize: 20,
    color: 'blue',
  },
  dataEntryButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Dashboard;
