import React from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    SafeAreaView,
    FlatList
 } from 'react-native'

 import { COLORS, icons, images, FONTS, SIZES, dummyData } from "../constants"

const CategoryCard = ({containerStyle, categoryItem, onPress}) => {
    return (
        <TouchableOpacity
            key={categoryItem.id}
            style={{
                flexDirection:'row',
                alignItems:'center',
                padding:10,
                marginTop:10,
                elevation: 5,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...containerStyle
            }}
            onPress={onPress}
        >
            {/* Image */}

            <Image
                source={categoryItem.image}
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
                    width:'55%',
                    paddingHorizontal:40,
                    alignItems: 'flex-start'
                }}
            >
                {/* Name */}
                <Text
                    style={{
                        // flex:1,
                        ...FONTS.h2
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
                    {categoryItem.category}
                </Text>
            </View>
            
            {/* cashback */}
            
            <View
                style={{
                    // width:'25%',
                    // paddingHorizontal:25,
                    alignItems: 'flex-start'
                }}
            >
                <Text
                    style={{
                        // flex:1,
                        ...FONTS.h2
                    }}
                >
                    {categoryItem.cashback}
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
        </TouchableOpacity>
    )
}

export default CategoryCard
