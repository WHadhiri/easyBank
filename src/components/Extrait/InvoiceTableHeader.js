import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '33%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '13%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty1: {
        width: '13%',
    },
    rate: {
        width: '21%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    amount: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
  });

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.amount}>Date</Text>
        <Text style={styles.rate}>Type</Text>
        <Text style={styles.description}>Name</Text>
        <Text style={styles.qty}>Debit</Text>
        <Text style={styles.qty1}>Credit</Text>
    </View>
  );
  
  export default InvoiceTableHeader