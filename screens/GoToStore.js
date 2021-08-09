import React,{useState, useEffect} from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, icons, images, FONTS, SIZES } from "../constants";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GoToStore = ({navigation, route}) => {
    
    const { storeImage } = route.params;

    const [id, setId] = useState('')
    const [token, setToken] = useState('')

    useEffect(() => {
        getData();
    }, []);
    
    const getData = async() => {
        try {
          const jsonValue = await AsyncStorage.getItem('UserData')
          if (jsonValue != null) {
            let user = JSON.parse(jsonValue);
            setId(user.userid);setToken(user.token)
            console.log('webview user - ', id , token)
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
                        height: 50,
                        width: 150,
                        backgroundColor: COLORS.black,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text 
                        style={{ color: COLORS.white, ...FONTS.body4 , 
                        textTransform:'uppercase'}}
                        onPress={() => navigation.navigate('webView', {userid: id, token: token})}
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
                    height: 100,
                    width:100,
                    // borderRadius:80
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
      backgroundColor: 'white',
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign:'center'
    },
});

export default GoToStore
