/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNav from '../router/bottomTabNav';
import { Text } from 'react-native';

const Root = createStackNavigator();
const Router = () => {
    return (
        <NavigationContainer>
            
            <Root.Navigator screenOptions={{headerShown:false}}>
                <Root.Screen component={BottomTabNav} name="Home" />
            </Root.Navigator>
        </NavigationContainer>
    );
};

export default Router;

