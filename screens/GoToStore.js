import React,{useState, useEffect} from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, icons, images, FONTS, SIZES } from "../constants";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GoToStore = ({navigation, route}) => {
    
    const { storeImage } = route.params;

    const [id, setId] = useState('')

    useEffect(() => {
        getData();
    }, []);
    
    const getData = async() => {
        try {
          const jsonValue = await AsyncStorage.getItem('UserData')
          if (jsonValue != null) {
            let user = JSON.parse(jsonValue);
            setId(user.userid);
            console.log('webview user - ', id)
          }
        } catch (error) {
            console.log(error);
        }
    }

    function renderButton() {
        return (
            <View style={{ margin: SIZES.padding * 4,
             marginHorizontal: SIZES.padding * 6 }}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        width: 180,
                        backgroundColor: COLORS.black,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text 
                        style={{ color: COLORS.white, ...FONTS.body2 , 
                        textTransform:'uppercase'}}
                        onPress={() => navigation.navigate('webView', {userid: id})}
                    >
                        Go To Store
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <>
        <View style={styles.container}>
            <Image 
                source={{uri: storeImage}} 
                style={{
                    height: 150,
                    width:150,
                    borderRadius:80
                }}                    
                resizeMode="contain"
                
                />
                {renderButton()}
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
    //   backgroundColor: '#fdeb93',
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign:'center'
    },
});

export default GoToStore
