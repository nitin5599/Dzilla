import React from 'react'
import { View, Text, Image } from 'react-native'
import { icons, images, COLORS, SIZES, FONTS} from '../constants'

const TabIcon = ({focused, icon, name}) => {
    return (
        <View
            style={{
                alignItems:'center',
                justifyContent:'center',
                height:80,
                width:55
            }}
        >
            <Image
                source={icon}
                resizeMode='contain'
                style={{
                    width:30,
                    height:30,
                    tintColor: focused ? COLORS.darkGreen 
                    : COLORS.black
                }}
            />
            <Text>{name}</Text>

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
