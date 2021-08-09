import React from 'react'
import { View, Text, Image } from 'react-native'
import { icons, images, COLORS, SIZES, FONTS} from '../constants'

const TabIcon = ({focused, icon, name}) => {
    return (
        <View
            style={{
                alignItems:'center',
                justifyContent:'center',
                height:60,
                width:60
            }}
        >
            <Image
                source={icon}
                resizeMode='contain'
                style={{
                    width:20,
                    height:20,
                    tintColor: focused ? COLORS.darkGreen 
                    : COLORS.black
                }}
            />
            <Text style={{fontSize:12}}>{name}</Text>

            { focused && 
                <View
                   style={{
                       position:'absolute',
                       left:0,
                       right:0,
                       bottom:0,
                       height:5,
                       borderTopLeftRadius:5,
                       borderTopRightRadius:5,
                       backgroundColor: COLORS.darkGreen
                   }} 
                /> }
        </View>
    )
}

export default TabIcon
