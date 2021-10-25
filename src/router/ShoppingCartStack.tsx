/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddressScreen from '../screens/AddressScreen';
import ShopingCartScreen from '../screens/ShopingCartScreen';

const Stack = createStackNavigator();

const ShoppingCartStack = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen component={ShopingCartScreen} name="cart"
                options={{title:'Shopping Cart'}}
                />
                <Stack.Screen component={AddressScreen} name="Address"
                options={{title:'Address'}}
                />
        </Stack.Navigator>
    );
};

export default ShoppingCartStack;

