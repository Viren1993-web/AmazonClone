/* eslint-disable prettier/prettier */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ShoppingCartStack from './ShoppingCartStack';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeStack from './HomeStack';
import MenuScreen from '../screens/MenuScreen';

const Tab = createBottomTabNavigator();
const BottomTabNav = () => {
    return (
        <Tab.Navigator tabBarOptions={{
            showLabel: false,
            inactiveTintColor: '#e47911',
            activeTintColor: '#ffbd7d',
        }}>
            <Tab.Screen
                component={HomeStack}
                name="home"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Entypo name="home" color={color} size={19} />
                    ),
                }}
            />
            <Tab.Screen
                component={HomeScreen}
                name="profile"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Entypo name="user" color={color} size={19} />
                    ),
                }}
            /><Tab.Screen
                component={ShoppingCartStack}
                name="cart"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Entypo name="shopping-cart" color={color} size={19} />
                    ),
                }}
            /><Tab.Screen
                component={MenuScreen}
                name="Menu"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Entypo name="menu" color={color} size={19} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNav;

