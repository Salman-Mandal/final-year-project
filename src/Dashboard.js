import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Dashboard = ({ navigation }) => {
  const expenseData = [
    { category: 'Seeds', name: 'Seed Purchase', price: 500, date: '2024-06-01' },
    { category: 'Fertilizer', name: 'Fertilizer Purchase', price: 300, date: '2024-06-02' },
  ];

  const earningsData = [
    { category: 'Tea Sales', name: 'Tea Product Sales', price: 1200, date: '2024-06-03' },
    { category: 'Harvesting', name: 'Harvesting Income', price: 800, date: '2024-06-04' },
  ];

  const medicineData = [
    { name: 'Pesticide', amount: 100, date: '2024-06-05' },
    { name: 'Fungicide', amount: 200, date: '2024-06-06' },
  ];

  const totalExpense = expenseData.reduce((sum, item) => sum + item.price, 0);
  const totalEarnings = earningsData.reduce((sum, item) => sum + item.price, 0);
  const netTotal = totalEarnings - totalExpense;

  const navigateToDataEntry = () => {
    navigation.navigate('DataEntry');
  };

  return (
    <View style={styles.container}>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Ionicons name="wallet-outline" size={24} color="green" style={styles.icon} />
            <Text style={styles.tableHeaderText}>Expense Entry</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeaderCell}>Name</Text>
            <Text style={styles.tableHeaderCell}>Category</Text>
            <Text style={styles.tableHeaderCell}>Price</Text>
            <Text style={styles.tableHeaderCell}>Date</Text>
          </View>
          {expenseData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.category}</Text>
              <Text style={styles.tableCell}>{item.price}</Text>
              <Text style={styles.tableCell}>{item.date}</Text>
            </View>
          ))}
          <Text style={styles.total}>Total Expense: ₹{totalExpense}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Ionicons name="cash-outline" size={24} color="green" style={styles.icon} />
            <Text style={styles.tableHeaderText}>Earnings Entry</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeaderCell}>Name</Text>
            <Text style={styles.tableHeaderCell}>Category</Text>
            <Text style={styles.tableHeaderCell}>Price</Text>
            <Text style={styles.tableHeaderCell}>Date</Text>
          </View>
          {earningsData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.category}</Text>
              <Text style={styles.tableCell}>{item.price}</Text>
              <Text style={styles.tableCell}>{item.date}</Text>
            </View>
          ))}
          <Text style={styles.total}>Total Earnings: ₹{totalEarnings}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Ionicons name="medkit-outline" size={24} color="green" style={styles.icon} />
            <Text style={styles.tableHeaderText}>Medicine Usage</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeaderCell}>Name</Text>
            <Text style={styles.tableHeaderCell}>Amount</Text>
            <Text style={styles.tableHeaderCell}>Date</Text>
          </View>
          {medicineData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.amount}</Text>
              <Text style={styles.tableCell}>{item.date}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      

      <TouchableOpacity style={styles.dataEntryButton} onPress={navigateToDataEntry}>
        <Text style={styles.buttonText}>Go to Data Entry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A5D8DD',
    padding: 20,
  },
  heading: {
    fontSize: 36,
    color: 'green',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  table: {
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  tableHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderCell: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'right',
  },
  netTotalContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  netTotalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  netTotalValue: {
    fontSize: 24,
    color: 'blue',
  },
  dataEntryButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Dashboard;
