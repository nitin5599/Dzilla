import React from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    SafeAreaView,
    FlatList,
    StyleSheet,
    Platform
 } from 'react-native'

import { COLORS, icons, images, FONTS, SIZES, dummyData } from "../constants"
import { BlurView, VibrancyView } from "@react-native-community/blur";

const RecipeCardDetails = ({recipeItem}) => {
    return (
        <View
            style={{
                flex:1,
                padding:5
            }}

        >
            {/* Name & Bookmark*/}

            <View
                style={{
                    flex:1,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    
                }}
            >
                <Text
                    style={{
                        width:"60%",
                        color:COLORS.white,
                        ...FONTS.h4,
                        fontSize: 18
                    }}
                >   
                    {recipeItem.name}
                </Text>

                <Image
                    source={recipeItem.isBookmark ? icons.bookmarkFilled 
                    : icons.bookmark}
                    style={{
                        width:20,
                        height:20,
                        marginRight: SIZES.base,
                        tintColor: COLORS.darkGreen
                    }}
                />
            </View>

            {/* Duration & serving */}
            
            <Text
                style={{
                    color: COLORS.lightGray,
                    ...FONTS.body4
                }}
            >
                {recipeItem.duration} | {recipeItem.serving} Serving
            </Text>
        </View>
    )
}

const RecipeCardInfo = ({recipeItem}) => {
    if(Platform.OS == 'ios')
    {
        return (
            <BlurView
                blurType="dark"
                style={StyleSheet.recipeCardContainer}
            >
                <RecipeCardDetails
                    recipeItem={recipeItem}
                />
            </BlurView>
        )
    }
    else{
       return (
            <View
                style={{
                    ...styles.recipeCardContainer,
                    backgroundColor: COLORS.transparentDarkGray
                }}
            >
                <RecipeCardDetails
                    recipeItem={recipeItem}
                />
            </View>
        )
    }
}

const TrendingCard = ({containerStyle, recipeItem, onPress}) => {
    return (
        <TouchableOpacity
            style={{
                height: 350,
                width: 250,
                marginTop: SIZES.radius,
                marginRight: 20,
                borderRadius: SIZES.radius,
                ...containerStyle
            }}
            onPress={onPress}
            key={recipeItem.id}
        >
            {/* Item image */}

            <Image
                source={recipeItem.image}
                resizeMode='cover'
                style={{
                    width:250,
                    height:350,
                    borderRadius: SIZES.radius
                }}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    recipeCardContainer:{
        position:'absolute',
        bottom:10,
        left:10,
        right:10,
        height:100,
        paddingHorizontal: SIZES.base,
        paddingVertical: SIZES.radius,
        borderRadius: SIZES.radius
    }
})
export default TrendingCard
