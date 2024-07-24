import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, ScrollView } from 'react-native';
import Btn from './Btn';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const Dataentry = () => {
    const [expenseCategory, setExpenseCategory] = useState('');
    const [expenseName, setExpenseName] = useState('');
    const [expensePrice, setExpensePrice] = useState('');

    const [earningsCategory, setEarningsCategory] = useState('');
    const [earningsName, setEarningsName] = useState('');
    const [earningsPrice, setEarningsPrice] = useState('');

    const [medicineName, setMedicineName] = useState('');
    const [medicineAmount, setMedicineAmount] = useState('');

    const expenseCategories = [
        'Labor Costs',
        'Cultivation and Plantation',
        'Infrastructure and Equipment',
        'Utilities',
        'Transportation',
        'Marketing and Sales',
        'Research and Development',
        'Regulatory Compliance',
    ];
    const earningsCategories = [
        'Tea Sales',
        'By-Products',
        'Tourism and Events',
        'Brand Licensing',
        'Training and Consultation',
        'Research Collaboration',
        'Subscription Services',
        'Tea Tastings and Experiences',
        'Tea Garden Stay',
    ];

    const handleSaveExpense = () => {
        console.log('Expense entry success:', { category: expenseCategory, name: expenseName, price: expensePrice });
        // Add your save logic here
    };

    const handleSaveEarnings = () => {
        console.log('Earnings entry success:', { category: earningsCategory, name: earningsName, price: earningsPrice });
        // Add your save logic here
    };

    const handleSaveMedicine = () => {
        console.log('Medicine entry success:', { name: medicineName, amount: medicineAmount });
        // Add your save logic here
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Expenses</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={expenseCategories.map((cat, index) => ({ label: cat, value: cat }))}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select a category"
                        searchPlaceholder="Search..."
                        value={expenseCategory}
                        onChange={(item) => setExpenseCategory(item.value)}
                        renderLeftIcon={() => (
                            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                        )}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setExpenseName}
                        value={expenseName}
                        placeholder="Name"
                        placeholderTextColor="#aaa"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setExpensePrice}
                        value={expensePrice}
                        placeholder="Price"
                        placeholderTextColor="#aaa"
                        keyboardType="numeric"
                    />
                    <Btn textColor="white" bgColor="blue" btnLabel="Save Expense" Press={handleSaveExpense} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Earnings</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={earningsCategories.map((cat, index) => ({ label: cat, value: cat }))}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select a category"
                        searchPlaceholder="Search..."
                        value={earningsCategory}
                        onChange={(item) => setEarningsCategory(item.value)}
                        renderLeftIcon={() => (
                            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                        )}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setEarningsName}
                        value={earningsName}
                        placeholder="Name"
                        placeholderTextColor="#aaa"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setEarningsPrice}
                        value={earningsPrice}
                        placeholder="Price"
                        placeholderTextColor="#aaa"
                        keyboardType="numeric"
                    />
                    <Btn textColor="white" bgColor="green" btnLabel="Save Earnings" Press={handleSaveEarnings} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Medicine Usage</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setMedicineName}
                        value={medicineName}
                        placeholder="Medicine Name"
                        placeholderTextColor="#aaa"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setMedicineAmount}
                        value={medicineAmount}
                        placeholder="Amount Used"
                        placeholderTextColor="#aaa"
                        keyboardType="numeric"
                    />
                    <Btn textColor="white" bgColor="purple" btnLabel="Save Medicine" Press={handleSaveMedicine} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:  '#A5D8DD', // Light blue background color
    },
    scrollContainer: {
        padding: 20,
        alignItems: 'center',
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        color: '#333',
    },
    dropdown: {
        marginVertical: 10,
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#333',
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#aaa',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#333',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default Dataentry;
