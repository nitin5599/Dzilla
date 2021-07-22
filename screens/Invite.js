import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { icons } from "../constants";

const Invite = () => {
    return (
        <>
        <View style={styles.container}>
            <Image source={icons.refer} style={{marginBottom: 50}}/>
            <Text 
                style={{
                    fontSize: 18,
                    fontWeight:'700',
                    margin: 10
                }}>Share Your Favorites</Text>
            <Text 
                style={{
                    fontSize: 16,
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
      backgroundColor: '#fdeb93',
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign:'center'
    },
});

export default Invite
