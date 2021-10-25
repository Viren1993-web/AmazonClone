/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({

  root: {

    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '100%',
    padding: 3,
  },
  row: {
    flexDirection: 'row',
  },
  quantityContainer: {
    margin: 5,
  },
  image: {
    width: 150,
    height: 150,
    flex: 2,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 14,
  },

  rightContainer: {
    padding: 10,
    width: '100%',
    flex: 3,
  },
  ratingsContainer: {
    flexDirection: 'row',
  },
  star: {
    margin: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  oldPrice: {
    fontSize: 14,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
  },
  describe: {

  },
});
export default styles;
