import React, {useEffect, useState} from 'react'
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
const CategoryCard = ({containerStyle, categoryItem, onPress, wishlist}) => {
    
    const [isFav, setIsFav] = useState(false)
    const [cart, setCart] = useState([])
    useEffect(() => {
        console.log('present in wishlist - ', wishlist._W)
        console.log(categoryItem)
        // let arr = []
        // arr.push(categoryItem)
        // console.log(arr)
        // arr.map((itm, index) => {
        //     itm.isFav = wishlist._W
        //     return {...itm}
        // })
        // console.log('arr data -> ', arr)
    }, [])
    const onTapAddToWishlist = async(item) => {
        // const newitem = {
        //     isFav: !isFav,
        //     ...item
        // }
        // console.log(newitem)
        // if(newitem.isFav === true){
        //     let newCart = []
        //     newCart.push(newitem);
        //     setCart(newCart)
        //     try {
        //         await AsyncStorage.setItem('wishlist', JSON.stringify(cart));
        //     } 
        //     catch (error) {
        //         console.log(error)
        //     }
            
        //     try {
        //         const myArray = await AsyncStorage.getItem('wishlist');
        //         if (myArray !== null) {
        //             console.log(JSON.parse(myArray));
        //         }
        //     } catch (error) {
        //         console.log(error)
        //     }    
        // }
        // else{
        //     console.log('no fav')
        // }
        // setIsFav(!isFav)        
    }

    return (
        <TouchableOpacity
            key={categoryItem._id}
            style={{
                flexDirection:'row',
                alignItems:'center',
                padding:10,
                marginTop:20,
                elevation: 5,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...containerStyle
            }}
            onPress={onPress}
        >
            {/* Image */}

            <Image
                source={{uri: categoryItem.fileName}}
                resizeMode='contain'
                
                style={{
                    width:100,
                    height:100,
                    borderRadius: SIZES.radius
                }}
            />

            {/* Ḍetails */}

            <View
                style={{
                    width:'45%',
                    paddingHorizontal:30,
                    alignItems: 'flex-start'
                }}
            >
                {/* Name */}
                <Text
                    style={{
                        // flex:1,
                        ...FONTS.h3
                    }}
                >
                    {categoryItem.name}
                </Text>

                {/* Category */}

                <Text
                    numberOfLines={2}
                    style={{
                        color: COLORS.lightGray2,
                        ...FONTS.body4,
                        
                    }}
                >
                    {categoryItem.description}
                </Text>
            </View>
            
            {/* cashback */}
            
            <View
                style={{
                    width:'20%',
                    alignItems: 'flex-start'
                }}
            >
                <Text
                    style={{
                        ...FONTS.h3
                    }}
                >
                    {categoryItem.cashback+'%'}
                </Text>

                <Text
                    style={{
                        color: COLORS.lightGray2,
                        ...FONTS.body4
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
                            width:25,
                            height:25,
                            tintColor:'#df245e'
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
