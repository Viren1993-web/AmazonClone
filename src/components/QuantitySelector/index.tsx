/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const QuantitySelector = ({quantity, setQuantity}) => {
    const onMinus = () => {
        setQuantity(Math.max(0,quantity - 1));
    };
    const onPlus = () => {
        setQuantity(quantity + 1);
    };
    return (
        <View style={styles.root}>
            <Pressable onPress={onMinus} style={styles.button}>
                <Text style={styles.buttonText}>-</Text>
            </Pressable>
            <Text style={styles.quantity}>{quantity}</Text>
            <Pressable onPress={onPlus} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        borderColor: '#d1d1d1',
        borderWidth: 1,
        width: 100,
        justifyContent: 'space-between',
    },
    button: {
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d1d1d1',
    },
    buttonText: {
        fontSize: 18,
    },
    quantity: {
        color: '#007eb9',
    },

});
export default QuantitySelector;
