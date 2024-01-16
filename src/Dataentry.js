import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput } from 'react-native';
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

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <View>
                    <Text>Expenses</Text>
                    <SafeAreaView>
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
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setExpensePrice}
                            value={expensePrice}
                            placeholder="Price"
                            keyboardType="numeric"
                        />

                        <View>
                            <Btn textColor="white" bgColor="blue" btnLabel="Save" Press={handleSaveExpense} />
                        </View>
                    </SafeAreaView>
                </View>
                <View>
                    <Text>Earnings</Text>
                    <SafeAreaView>
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
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setEarningsPrice}
                            value={earningsPrice}
                            placeholder="Price"
                            keyboardType="numeric"
                        />

                        <View>
                            <Btn textColor="white" bgColor="blue" btnLabel="Save" Press={handleSaveExpense} />
                        </View>
                    </SafeAreaView>
                </View>



            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
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
