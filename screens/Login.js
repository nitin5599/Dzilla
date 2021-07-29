import React, {useState, useEffect} from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    Modal,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    Alert
} from 'react-native'
import axios from 'axios'; 
import { icons, images, COLORS, SIZES, FONTS} from '../constants'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  GoogleSignin,
    GoogleSigninButton,
    statusCodes, } from '@react-native-google-signin/google-signin';
import { isEmpty } from 'lodash';

const SignUp = ({navigation}) => {
    
    const [user, setuser] = useState({});
    
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '113035076335-kkr3lf5t2953fhc69htrcbl3b63d83c8.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        });
        isSignedIn();
    }, [])

    const signIn = async() => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('due___', userInfo)
            setuser(userInfo);
        } catch (error) {
            console.log('error message___ ', error.message)
                if(error.code === statusCodes.SIGN_IN_CANCELLED){
                    console.log('user cancelled login flow')
                }else if(error.code === statusCodes.IN_PROGRESS){
                    console.log('user signing in....')
                }else if(error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE){
                    console.log('google play services not available')
                }else{
                    console.log('some other error!')
                }
            }
        }

    const isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if(!!isSignedIn){
            getCurrentUserInfo()
        }else{
            console.log('Please login!')
        }
    }

    const getCurrentUserInfo = async()=>{
        try {
            const userInfo = await GoogleSignin.signInSilently();
            console.log('edit__', user);
            setuser(userInfo)
        } catch (error) {
            if(error.code === statusCodes.SIGN_IN_REQUIRED){
                Alert.alert('User has not Signed in yet!')
                console.log('User has not Signed in yet!')
            }else{
                Alert.alert('something went wrong!')
                console.log('something went wrong!')
            }
        }
    }

    const signOut = async() => {
        try {
            await GoogleSignin.revokeAccess()
            await GoogleSignin.signOut()
            setuser({})
        } catch (error) {
            console.error(error)
        }
    }

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = React.useState(false)

    const [areas, setAreas] = React.useState([])
    const [selectedArea, setSelectedArea] = React.useState(null)
    const [modalVisible, setModalVisible] = React.useState(false)

    function renderHeader() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    marginTop: SIZES.padding * 6,
                    paddingHorizontal: SIZES.padding * 2
                }}
                onPress={() => console.log("Sign In")}
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.white
                    }}
                />

                <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.white, ...FONTS.h4 }}>Sign In</Text>
            </TouchableOpacity>
        )
    }

    function renderLogo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 5,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={images.wallieLogo}
                    resizeMode="contain"
                    style={{
                        width: "60%"
                    }}
                />
            </View>
        )
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        try {
            AsyncStorage.getItem('UserData')
                .then(value => {
                    if (value != null) {
                        navigation.navigate('Stores');
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }
    const [name, setName] = useState('')
    const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginData, setLoginData] = useState([])

    useEffect(async() => {
        if(loginData){
            axios.get('https://dzilla.herokuapp.com/api/users/')
            .then(response => {
                console.log('ALL USERS DATA - ',response.data)
            })
            .catch((error) => {
                console.log('ERROR - ', error);
            })
        }
    }, [loginData])

    const submitHandler = async(e) => {
        e.preventDefault();   
        if(email && password){
            try {

                const headers = {
                    'Content-Type': 'application/json'
                }

                setLoading(true)

                const user = JSON.stringify({
                    email: email,
                    password: password
                })

                const config = {
                    // method: 'POST',
                    headers: headers,
                    body: user
                }
                
                
                await axios.post('https://dzilla.herokuapp.com/api/users/login' , user, {headers: headers})
                .then((res)=>{     
                    console.log('LOGIN RESPONSE - ', res.data) 
                    setLoginData(res.data)                   
                }).catch(err=>{
                    console.log(err)
                })

                // const callUserData = await axios.get('http://localhost:5000/api/users/')
                // const data = await callUserData.data;
                // console.log(data)
                //     .then(response => {
                //         console.log('USERS DATA - ', response.data)                     
                // })
                
                // const callUserData = () => {
                //    fetch('http://localhost:5000/api/users/')
                //     .then((res) => {
                //         console.log('USERDATA - ', res.json());                            
                //     })
                // }

                // fetch('https://dzilla.herokuapp.com/api/users/login', config)
                // .then((response) => response.json())
                // .then(
                // //     (json) => {
                // //   console.log('LOGIN RESPONSE', json)
                //   callUserData()
                // // }
                // )
                
                // const response =  await fetch('https://dzilla.herokuapp.com/api/users/login', config)
                // const data = await response.json();
                
                // if(data.message === 'Invalid Credentials!'){
                //     Alert.alert('Alert', data.message)
                // }
                // else{
                //     try {
                        // const existingUser = await AsyncStorage.getItem('UserData')
                        // if(existingUser.email === email)
                        // {
                        //     const userdata = {
                        //         ...existingUser
                        //     }    
                        //     await AsyncStorage.setItem('UserData', JSON.stringify(userdata));
                        //     navigation.navigate('Stores');
                        // }
                        // else{
                            // const userRes = await axios.get('http://localhost:5000/api/users')
                            // const userdata = await userRes.json();
                            // .then(response => {
                                // console.log(userdata)
                                // setItems(response.data)
                                // setSuccessMsg('Category successfully updated')                      
                            // })
                            // fetch('http://localhost:5000/api/users/')
                            // .then((res) => {
                            //     console.log(res.json());                            
                            // })
                        // }
                        // const userdata = {
                        //     email: email,
                        //     pic: pic,
                        //     token: data.token
                        // }                       
                
                    // } catch (error) {
                    //     console.log('some error - ', error);
                    // }
                    // AsyncStorage.setItem('token', data.token)
                    // const key =  await AsyncStorage.getItem('token');
                    // if(key)
                    //     navigation.navigate('Stores')
                // }

                setLoading(false)
            } 
            catch (error) {
                console.error("getting error - ", error)
            }
        }
        else{
            Alert.alert('Alert', 'invalid credentials')
        }
    }

    function renderForm() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 3,
                    marginHorizontal: SIZES.padding * 3,
                }}
            >
               
                {/* Email */}

                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Email</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Enter email"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                {/* Password */}

                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Password</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Password"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 10,
                            height: 30,
                            width: 30
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={showPassword ? icons.disable_eye : icons.eye}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.white
                            }}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    function renderButton() {
        return (
            <View style={{ margin: SIZES.padding * 3 }}>
                <TouchableOpacity
                    onPress={submitHandler}
                    style={{
                        height: 60,
                        backgroundColor: COLORS.black,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderGoogleLogin() {
        return (
            <View style={{ margin: SIZES.padding * 3 }}>
                <View style={{alignItems:'center', justifyContent:'center',flex:1}}>
                    {
                        !user.idToken ? 
                        <GoogleSigninButton
                            style={{width: 215, height: 58}}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Light}
                            onPress={signIn}
                        /> :
                        <TouchableOpacity onPress={signOut}>
                            <Text>Sign Out</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }

    function renderAreaCodesModal() {

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{ padding: SIZES.padding, flexDirection: 'row' }}
                    onPress={() => {
                        setSelectedArea(item)
                        setModalVisible(false)
                    }}
                >
                    <Image
                        source={{ uri: item.flag }}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body4 }}>{item.name}</Text>
                </TouchableOpacity>
            )
        }

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View
                            style={{
                                height: 400,
                                width: SIZES.width * 0.8,
                                backgroundColor: COLORS.lightGreen,
                                borderRadius: SIZES.radius
                            }}
                        >
                            <FlatList
                                data={areas}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.code}
                                showsVerticalScrollIndicator={false}
                                style={{
                                    padding: SIZES.padding * 2,
                                    marginBottom: SIZES.padding * 2
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <LinearGradient
                colors={[COLORS.lime, COLORS.emerald]}
                style={{ flex: 1,  }}
            >
                <ScrollView>
                    {/* {renderHeader()} */}
                    {renderLogo()}
                    {renderForm()}
                    {renderButton()}
                    <View style={{ margin: SIZES.padding * 1 }}>
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => navigation.navigate("SignUp")}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Not a member? Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ margin: SIZES.padding * 2, alignItems:'center' }}>
                        <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
                        OR</Text>
                    </View>
                    {renderGoogleLogin()}
                </ScrollView>
            </LinearGradient>
            {/* {renderAreaCodesModal()} */}
        </KeyboardAvoidingView>
    )
}

export default SignUp
