/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../AddressScreen/styles';
import countryList from 'country-list';
import { Auth, DataStore, API, graphqlOperation } from 'aws-amplify';
import { Order, OrderProduct, CartProduct } from '../../models';
import Button from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createPaymentIntent } from '../../graphql/mutations';
import { useStripe } from '@stripe/stripe-react-native';
const countries = countryList.getData();

const AddressScreen = () => {
    const [country, setCountry] = useState(countries[0].code);

    const [fullname, setfullname] = useState('');
    const [fullnameError, setfullnameError] = useState('Invalid fullname');

    const [phone, setphone] = useState('');
    const [phoneError, setphoneError] = useState('Invalid Phone');

    const [address, setaddress] = useState('');

    const [addressError, setAddressError] = useState('Invalid Address');

    const [city, setcity] = useState('');
    const [cityError, setcityError] = useState('Invalid City');
    const [clientSecret, setClientSecret] = useState < string | null >(null);

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const navigation = useNavigation();

    const route = useRoute();
    const amount = Math.floor(route.params?.totalPrice * 100 || 0);

    useEffect(() => {
        fetchPaymentIntent();
    }, []);

    useEffect(() => {
        if (clientSecret) {
            initializePaymentSheet();
        }
    }, [clientSecret]);

    const fetchPaymentIntent = async () => {
        const response = await API.graphql(
            graphqlOperation(createPaymentIntent, { amount }),
        );
        setClientSecret(response.data.createPaymentIntent.clientSecret);
    };

    const initializePaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    const {error} = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
    });
    console.log('success');
    if (error) {
      Alert.alert(error);
    }
  };

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    const {error} = await presentPaymentSheet({clientSecret});

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      saveOrder();
      Alert.alert('Success', 'Your payment is confirmed!');
    }
  };

  const saveOrder = async () => {
    // get user details
    const userData = await Auth.currentAuthenticatedUser();
    // create a new order
    const newOrder = await DataStore.save(
      new Order({
        userSub: userData.attributes.sub,
        fullName: fullname,
        phoneNumber: phone,
        country,
        city,
        address,
      }),
    );

    // fetch all cart items
    const cartItems = await DataStore.query(CartProduct, cp =>
      cp.userSub('eq', userData.attributes.sub),
    );

    // attach all cart items to the order
    await Promise.all(
      cartItems.map(cartItem =>
        DataStore.save(
          new OrderProduct({
            quantity: cartItem.quantity,
            option: cartItem.option,
            productID: cartItem.productID,
            orderID: newOrder.id,
          }),
        ),
      ),
    );

    // delete all cart items
    await Promise.all(cartItems.map(cartItem => DataStore.delete(cartItem)));

    // redirect home
    navigation.navigate('home');
  };

  const onCheckout = () => {
    if (addressError) {
      Alert.alert('Fix all field errors before submitting');
      return;
    }

    if (!fullname) {
      Alert.alert('Please fill in the fullname field');
      return;
    }

    if (!phone) {
      Alert.alert('Please fill in the phone number field');
      return;
    }

    // handle payments
    openPaymentSheet();
  };
const validateAddress = () => {
        if (address.length < 5) {
            setAddressError('Address is too short');
        }
        if (fullname.length < 5) {
            setfullnameError('Full name is too short');
        }
        if (isNaN(phone.length) || phone.length < 9) {
            setfullnameError('please enter phone number');
        }
        if (phone.length < 3) {
            setfullnameError('please enter city');
        }
        saveOrder();
    };

    return (
        <ScrollView style={styles.root}>
            <View style={styles.row}>
                <Picker selectedValue={country} onValueChange={setCountry}>
                    {countries.map(country => (
                        <Picker.Item value={country.code} label={country.name} />
                    ))}
                </Picker>
            </View>
            {/* Full name */}
            <View style={styles.row}>
                <Text style={styles.label}>Full Name (First and Last Name)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Full name"
                    value={fullname}
                    onEndEditing={validateAddress}
                    onChangeText={(text) => { setfullname(text); setfullnameError(''); }}
                />
                {!!fullnameError && <Text style={styles.errorlabel}>{fullnameError}</Text>}
            </View>
            {/* Phone number */}
            <View style={styles.row}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    keyboardType={'numeric'}
                    style={styles.input}
                    placeholder="Phone"
                    value={phone}
                    onEndEditing={validateAddress}
                    onChangeText={(text) => { setphone(text); setphoneError(''); }}
                />
                {!!phoneError && <Text style={styles.errorlabel}>{phoneError}</Text>}
            </View>
            {/* Address */}
            <View style={styles.row}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={address}
                    onEndEditing={validateAddress}
                    onChangeText={(text) => { setaddress(text); setAddressError(''); }}
                />
                {!!addressError && <Text style={styles.errorlabel}>{addressError}</Text>}
            </View>
            {/* City */}
            <View style={styles.row}>
                <Text style={styles.label}>City</Text>
                <TextInput
                    style={styles.input}
                    placeholder="City"
                    value={city}
                    onChangeText={setcity}
                />
                {!!cityError && <Text style={styles.errorlabel}>{cityError}</Text>}
            </View>
            <Button text="Checkout" onPress={onCheckout} />
        </ScrollView>
    );
};

export default AddressScreen;
