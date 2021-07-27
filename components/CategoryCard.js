import React, {useEffect} from 'react'
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

import LottieView from "lottie-react-native";
 
const CategoryCard = ({containerStyle, categoryItem, onPress}) => {
    
    const [isFav, setIsFav] = React.useState(false)

    useEffect(() => {
        
    }, [isFav])

    return (
        <TouchableOpacity
            key={categoryItem._id}
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
                        ...FONTS.h2
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
                    width:'5%',
                    alignItems: 'flex-start'
                }}>  
                <TouchableOpacity
                    onPress={()=>setIsFav(!isFav)}
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
