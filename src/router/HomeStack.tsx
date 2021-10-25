import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import {TextInput, SafeAreaView, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const Stack = createStackNavigator();

interface HeaderComponentProps {
  searchValue: string;
  setSearchValue: () => void;
}

const HeaderComponent = ({
  searchValue,
  setSearchValue,
}: HeaderComponentProps) => {
  return (
    <SafeAreaView style={{backgroundColor: '#22e3dd'}}>
      <View
        style={{
          margin: 10,
          backgroundColor: 'white',
          padding: 5,
          flexDirection: 'row',
          alignItem: 'center',
        }}>
        <Feather name="search" size={22} />
        <TextInput
          style={{
            height: 25,
            marginLeft: 10,
            backgroundColor: 'white',
            padding: 5,
          }}
          placeholder="search"
          value={searchValue}
          onChangeText={setSearchValue}
        />
      </View>
    </SafeAreaView>
  );
};
const HomeStack = () => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => (
          <HeaderComponent
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        ),
      }}>
      <Stack.Screen name="HomeScreen" options={{title: 'Home'}}>
        {() => <HomeScreen searchValue={searchValue} />}
      </Stack.Screen>
      <Stack.Screen component={ProductScreen} name="ProductDetails" />
    </Stack.Navigator>
  );
};

export default HomeStack;
