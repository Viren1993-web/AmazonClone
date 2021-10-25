/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { useState, useCallback } from "react";
import {
    View,
    Image,
    StyleSheet,
    FlatList,
    useWindowDimensions,
} from "react-native";

const ImageCarousel = ({ images }: { images: string[] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const windowWidth = useWindowDimensions().width;
    const onFlatlistUpdate = useCallback(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index || 0);
        }
        //console.log(viewableItems);
    }, []);

    return (
        <View style={styles.root}>
            <FlatList
                data={images}
                renderItem={({ item }) => (
                    <Image
                        style={[styles.image, { width: windowWidth - 40 }]}
                        source={{ uri: item }} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={windowWidth - 20}
                snapToAlignment={'center'}
                decelerationRate={'fast'}
                viewabilityConfig={{
                    viewAreaCoveragePercentThreshold: 50, //Should be wright correct word
                    //minimumViewTime:300,
                }}
                onViewableItemsChanged={onFlatlistUpdate}
            />
            <View style={styles.dots}>
                {images.map((image, index) => (
                    <View
                        style={[
                            styles.dot,
                            {
                                backgroundColor: index === activeIndex ? '#c9c9c9' : '#ededed',
                            },
                        ]} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {

    },
    image: {
        margin: 10,
        height: 250,
        resizeMode: 'contain',
    },
    dot: {
        width: 15,
        height: 15,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#ededed',
        borderColor: '#c9c9c9',
        margin: 5,

    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

});

export default ImageCarousel;