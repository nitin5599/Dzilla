import React, {useState, useEffect} from 'react';
import {View,RefreshControl, Image, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import axios from 'axios';
import Share from 'react-native-share';
import files from "../constants/filebase64";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import { COLORS, icons, images } from "../constants"

const Account = ({navigation}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [wallet, setWallet] = useState('')
    const [tokenId, setTokenId] = useState('')
    const [pic, setPic] = useState('https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg')
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        getData();
    }, [useIsFocused()]);

    const getData = async() => {
        // try {
        //     const jsonValue = await AsyncStorage.getItem('UserData')
        //     // return jsonValue != null ? JSON.parse(jsonValue) : null;
        //     console.log(jsonValue != null ? JSON.parse(jsonValue) : null)
        // } catch (error) {
        //     console.log(error)
        // }
        try {
            const jsonValue = await AsyncStorage.getItem('UserData')
                if (jsonValue !==null) {
                    let user = JSON.parse(jsonValue);
                    console.log('user = ', user)
                    setName(user.name);
                    setEmail(user.email);
                    setPic(user.pic);
                    setWallet(user.wallet);
                }
        } catch (error) {
            console.log(error);
        }
    }

    const myCustomShare = async () => {
        const shareOptions = {
          message: 'I am sending this message!',
          url: files.image1
        }
    
        try {
          const ShareResponse = await Share.open(shareOptions);
          console.log(JSON.stringify(ShareResponse));
        } catch(error) {
          console.log('Error => ', error);
        }
    };

    const handleLogout = async () => {
        try {
            // await AsyncStorage.clear()
            await AsyncStorage.removeItem('UserData')
            navigation.navigate('Login')
        }
        catch(error){
            console.log(error)
        }
    }
    
    const wait = (timeout) => {
        // return getUpdatedData()
        return new Promise(resolve => setTimeout(resolve, timeout));
        
    }
    
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async() => {
        setRefreshing(true);
        // getData()
        fetch('https://dzilla.herokuapp.com/api/users/')
        .then(response => 
            // response.json()
            console.log(response)
            // {
            //     response.data.map((currentuser) => 
            //         currentuser.email === email ? setName(currentuser.name) : ''
            //     )                
            //     let localuserdata = {
            //         name: response.data.name,
            //         email: response.data.email,
            //         pic: response.data.pic,
            //         wallet: response.data.wallet
            //     }
            //     console.log('localuserdata-', localuserdata)
            // }
        )
        // .then((json) => {
        //     setDataList(json)
        //     console.log('Product api Response - ', json)
        //     // ListCategories()
        //     setLoading(false)
        // })
        .catch((error) => console.error(error))
        // axios.get('https://dzilla.herokuapp.com/api/users/')
        //     .then(response => {
                // response.data.map((currentuser) => 
                //     currentuser.email === email ? setName(currentuser.name) : ''
                // )                
                // let localuserdata = {
                //     name: name,
                //     email: email,
                //     pic: pic,

                // };
        //         // console.log(localuserdata)
        //         AsyncStorage.setItem('UserData', JSON.stringify(localuserdata));
        //         // navigation.navigate('Stores')
        //     })
        //     .catch((error) => {
        //         console.log('ERROR - ', error);
        //     })  
        wait(2000).then(() => setRefreshing(false));
    }, []);
    
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView 
            refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
            }
        >
            <View style={styles.userInfoSection} >
                <View style={{flexDirection: 'row', marginTop: 15}}>
                <Avatar.Image 
                    source={{uri: pic}}
                    size={80}
                />
                <View style={{marginLeft: 20}}>
                    <Title 
                        style={[
                            styles.title,
                            {
                                marginTop:25,
                                marginBottom: 0,
                            }
                        ]}
                    >{name}</Title>
                    {/* <Caption style={styles.caption}>@nitin_55</Caption> */}
                </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                
                {/* <View style={styles.row}>
                    <Image source={icons.location} style={{width:25, height:25}}/>
                    <Text style={{color:"#000", marginLeft: 20, fontSize: 16}}>Kishangarh, India</Text>
                </View> */}
                
                {/* <View style={styles.row}>
                    <Image source={icons.phone} style={{width:25, height:25}}/>
                    <Text style={{color:"#000", marginLeft: 20, fontSize: 16}}>+91-9602996383</Text>
                </View> */}
                
                <View style={styles.row}>
                    <Image source={icons.mail} style={{width:25, height:25}}/>
                    <Text style={{color:"#000", marginLeft: 20, fontSize: 16}}>{email}</Text>
                </View>

            </View>

            <View style={styles.infoBoxWrapper}>
            
                <View 
                    style={[
                        styles.infoBox,
                        {
                            borderRightColor: '#dddddd',
                            borderRightWidth: 1
                        }
                    ]}
                >
                    <Title>₹{wallet}</Title>
                    <Caption style={{fontSize: 16}}>Wallet</Caption>
                </View>

                <View style={styles.infoBox}>
                    <Title>12</Title>
                    <Caption style={{fontSize: 16}}>Orders</Caption>
                </View>
            
            </View>

            <View style={styles.menuWrapper}>

                <TouchableRipple onPress={() => console.log('something')}>
                    <View style={styles.menuItem}>
                        <Image source={icons.heart} color="#FF6347" style={{width:25, height:25}}/>
                        <Text style={styles.menuItemText}>Your Favorites</Text>
                    </View>
                </TouchableRipple>
            
                <TouchableRipple onPress={() => console.log('something')}>
                    <View style={styles.menuItem}>
                        <Image source={icons.wallet} color="#FF6347" style={{width:25, height:25}}/>
                        <Text style={styles.menuItemText}>Payment</Text>
                    </View>
                </TouchableRipple>
            
                <TouchableRipple onPress={() => myCustomShare()}>
                    <View style={styles.menuItem}>
                        <Image source={icons.share} color="#FF6347" style={{width:25, height:25}}/>
                        <Text style={styles.menuItemText}>Tell Your Friends</Text>
                    </View>
                </TouchableRipple>
            
                <TouchableRipple onPress={() => console.log('something')}>
                    <View style={styles.menuItem}>
                        <Image source={icons.support} color="#FF6347" style={{width:25, height:25}}/>
                        <Text style={styles.menuItemText}>Support</Text>
                    </View>
                </TouchableRipple>
            
                <TouchableRipple onPress={() => console.log('something')}>
                    <View style={[styles.menuItem, {paddingHorizontal: 30}]}>
                        <Image source={icons.settings} color="#FF6347" style={{width:25, height:25}}/>
                        <Text style={[styles.menuItemText, {paddingHorizontal: 0}]}>Settings</Text>
                    </View>
                </TouchableRipple>
                
                <TouchableRipple onPress={handleLogout}>
                    <View style={[styles.menuItem, {paddingHorizontal: 30}]}>
                        <Image source={icons.logout} color="#FF6347" style={{width:25, height:25}}/>
                        <Text style={[styles.menuItemText, {paddingHorizontal: 0}]}>Logout</Text>
                    </View>
                </TouchableRipple>
            
            </View>
        
        </ScrollView>
          
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff9e8'
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuWrapper: {
      marginTop: 10,
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    menuItemText: {
      color: '#000',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 18,
      lineHeight: 26,
    },
});

export default Account
