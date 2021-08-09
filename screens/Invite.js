import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { icons, FONTS,SIZES,COLORS } from "../constants";

const Invite = () => {
    return (
        <>
        <View style={styles.container}>
            <Image source={icons.refer} style={{marginBottom: 50, width:100, height:100, }} resizeMode="center"/>
            <Text 
                style={{
                    fontSize: 12,
                    ...FONTS.body3,
                    fontWeight:'700',
                    margin: 10
                }}>Share Your Favorites</Text>
            <Text 
                style={{
                    fontSize: 12,
                }}>
                Share Your Thoughts With Similar Kind of People
            </Text>    
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#edf1f7',
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign:'center'
    },
});

export default Invite
