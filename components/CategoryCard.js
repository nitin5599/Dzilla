import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    SafeAreaView,
    FlatList,
    StyleSheet
} from 'react-native'

import { COLORS, icons, images, FONTS, SIZES, dummyData } from "../constants"
import AsyncStorage from "@react-native-async-storage/async-storage";
const CategoryCard = ({ containerStyle, categoryItem, onPress, wishlist, onChange }) => {

    const [isFav, setIsFav] = useState(wishlist)
    const [cart, setCart] = useState([])
    useEffect(() => {
        console.log('present in wishlist - ', wishlist)
    }, [])
    const onTapAddToWishlist = async (item) => {
        var arr = await AsyncStorage.getItem('wishlist');
        if (arr === null) {
            arr = []
        }else{
            arr = JSON.parse(arr)
        }
        if (isFav) {
            arr.splice(
                arr.findIndex(a => a._id === categoryItem._id), 1)
            await AsyncStorage.setItem('wishlist', JSON.stringify(arr));
            setIsFav(!isFav);
        }
        else {
            arr.push(categoryItem);
            await AsyncStorage.setItem('wishlist', JSON.stringify(arr));

            setIsFav(!isFav)
        }
        onChange()
    }

    return (
        <TouchableOpacity
            key={categoryItem._id}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                marginTop: 20,
                elevation: 5,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...containerStyle
            }}
            onPress={onPress}
        >
            {/* Image */}

            <Image
                source={{ uri: categoryItem.fileName }}
                resizeMode='contain'

                style={{
                    width: 70,
                    height: 70,
                    borderRadius: SIZES.radius
                }}
            />

            {/* Ḍetails */}

            <View
                style={{
                    width: '45%',
                    paddingHorizontal: 30,
                    alignItems: 'flex-start'
                }}
            >
                {/* Name */}
                <Text
                    style={{
                        ...FONTS.h4,
                        fontSize:14
                    }}
                >
                    {categoryItem.name}
                </Text>

                {/* Category */}

                <Text
                    numberOfLines={2}
                    style={{
                        color: COLORS.lightGray2,
                        ...FONTS.body5,

                    }}
                >
                    {categoryItem.description}
                </Text>
            </View>

            {/* cashback */}

            <View
                style={{
                    width: '25%',
                    alignItems: 'flex-start',
                }}
            >
                <Text
                    style={{
                        ...FONTS.h4,
                        fontSize:14,
                    }}
                >
                    {categoryItem.cashback + '%'}
                </Text>

                <Text
                    style={{
                        color: COLORS.lightGray2,
                        ...FONTS.body5
                    }}
                >
                    cashback
                </Text>
            </View>

            <View style={{
                // width:'5%',
                alignItems: 'flex-start'
            }}>
                <TouchableOpacity
                    onPress={() => onTapAddToWishlist(categoryItem)}
                >
                    <Image source={isFav ? icons.heartFilled : icons.heart}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: '#df245e'
                        }}
                    />
                </TouchableOpacity>
            </View>


        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    heart: {
        width: 20,
        height: 20,
        tintColor: "#6e7f8d",
    },
    heartFilled: {
        tintColor: "#df245e",
    },
    heartLottie: {
        width: 50,
        height: 50,
        marginLeft: -5,
    },
})

export default CategoryCard
