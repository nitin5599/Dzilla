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
    StyleSheet,
    ActivityIndicator,
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

const Login = ({navigation}) => {
    
    const [user, setuser] = useState({});
    
    // useEffect(() => {
    //     GoogleSignin.configure({
    //         webClientId: '113035076335-kkr3lf5t2953fhc69htrcbl3b63d83c8.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    //         offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    //         forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    //     });
    //     isSignedIn();
    // }, [])

    // const signIn = async() => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         console.log('due___', userInfo)
    //         setuser(userInfo);
    //     } catch (error) {
    //         console.log('error message___ ', error.message)
    //             if(error.code === statusCodes.SIGN_IN_CANCELLED){
    //                 console.log('user cancelled login flow')
    //             }else if(error.code === statusCodes.IN_PROGRESS){
    //                 console.log('user signing in....')
    //             }else if(error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE){
    //                 console.log('google play services not available')
    //             }else{
    //                 console.log('some other error!')
    //             }
    //         }
    //     }

    // const isSignedIn = async () => {
    //     const isSignedIn = await GoogleSignin.isSignedIn();
    //     if(!!isSignedIn){
    //         getCurrentUserInfo()
    //     }else{
    //         console.log('Please login!')
    //     }
    // }

    // const getCurrentUserInfo = async()=>{
    //     try {
    //         const userInfo = await GoogleSignin.signInSilently();
    //         console.log('edit__', user);
    //         setuser(userInfo)
    //     } catch (error) {
    //         if(error.code === statusCodes.SIGN_IN_REQUIRED){
    //             Alert.alert('User has not Signed in yet!')
    //             console.log('User has not Signed in yet!')
    //         }else{
    //             Alert.alert('something went wrong!')
    //             console.log('something went wrong!')
    //         }
    //     }
    // }

    // const signOut = async() => {
    //     try {
    //         await GoogleSignin.revokeAccess()
    //         await GoogleSignin.signOut()
    //         setuser({})
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    const [showPassword, setShowPassword] = React.useState(false)
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
                <Text style={styles.text}>Dzilla</Text>
                {/* <Image
                    source={images.wallieLogo}
                    resizeMode="contain"
                    style={{
                        width: "60%"
                    }}
                /> */}
            </View>
        )
    }

    const [name, setName] = useState('')
    const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [tokenId, setTokenId] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [loginData, setLoginData] = useState(false)

    useEffect(async() => {
        // if(loginData){
        // //     console.log('USERDATA - ', loginData)
        //     await axios.get('https://dzilla.herokuapp.com/api/users/')
        //     .then(response => {
        //         response.data.map((currentuser) => 
        //             currentuser.email === email ? setName(currentuser.name) : ''
        //         )                
        //         let localuserdata = {
        //             name: name,
        //             email: email,
        //             pic: pic,
        //             token: tokenId
        //         };
        //         console.log('localuserdata - ', localuserdata)
        //         const jsonValue = JSON.stringify(localuserdata)
        //         AsyncStorage.setItem('UserData', jsonValue);

        //         navigation.navigate('Stores')
        //     })
        //     .catch((error) => {
        //         console.log('ERROR - ', error);
        //     })
        // }
        // else
        //     console.log('sorry')
    }, [loginData])

    const submitHandler = async(e) => {
        e.preventDefault();   
        if(email && password){
            try {
         
                setLoading(true)   

                const headers = {
                    'Content-Type': 'application/json'
                }

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
                // const responseData = await response;
                .then((response)=>{   
                    // if(response.data)  
                    // {
                        console.log('LOGIN RESPONSE - ', response.data) 
                        // setName(response.data.name);setEmail(response.data.email);setTokenId(response.data.token)
                        // console.log('Values - ', name, email, tokenId )  
                        let localuserdata = {
                            name: response.data.name,
                            email: response.data.email,
                            pic: pic,
                            token: response.data.tokenId
                        };
                        console.log('localuserdata - ', localuserdata)
                        const jsonValue = JSON.stringify(localuserdata)
                        AsyncStorage.setItem('UserData', jsonValue);

                        navigation.navigate('Stores')            
                        // if(name && email && tokenId){
                        //     axios.get('https://dzilla.herokuapp.com/api/users/')
                        //     .then(response => {
                        //         response.data.map((currentuser) => 
                        //             currentuser.email === email ? setName(currentuser.name) : ''
                        //         )                
                                // let localuserdata = {
                                //     name: name,
                                //     email: email,
                                //     pic: pic,
                                //     token: tokenId
                                // };
                                // console.log('localuserdata - ', localuserdata)
                                // const jsonValue = JSON.stringify(localuserdata)
                                // AsyncStorage.setItem('UserData', jsonValue);

                                // navigation.navigate('Stores')
                        //     })
                        //     .catch((error) => {
                        //         console.log('ERROR - ', error);
                        //     })
                        // }
                    //     else
                    //         console.log('sorry')
        
                    // }
                }).catch(err=>{
                    console.log(err);
                    if(err == 401)
                        Alert.alert('Alert', "User doesn't exists!")
                }).finally(()=>setLoading(false))
            } 
            catch (error) {
                console.error("getting error - ", error)
            }
            // setLoading(false)
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
                    {/* <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Email</Text> */}
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.black,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.black,
                            ...FONTS.body3
                        }}
                        placeholder="Enter email"
                        placeholderTextColor={COLORS.black}
                        selectionColor={COLORS.black}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                {/* Password */}

                <View style={{ marginTop: SIZES.padding * 2 }}>
                    {/* <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Password</Text> */}
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.black,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.black,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Password"
                        placeholderTextColor={COLORS.black}
                        selectionColor={COLORS.black}
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
                                tintColor: COLORS.black
                            }}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    function renderButton() {
        return (
            <View style={{ margin: SIZES.padding * 4,
             marginHorizontal: SIZES.padding * 6 }}>
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
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                    {isLoading ? <ActivityIndicator size="small" color="#fff" /> : 'Login'}
                    </Text>
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
                            color={GoogleSigninButton.Color.Dark}
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
            {/* <LinearGradient
                colors={[COLORS.lime, COLORS.emerald]}
                style={{ flex: 1,  }}
            > */}
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
                            <Text style={{ color: COLORS.black, ...FONTS.h4 }}>Not a member? Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ margin: SIZES.padding * 2, alignItems:'center' }}>
                        <Text style={{ color: COLORS.black, ...FONTS.h4 }}>
                        OR</Text>
                    </View>
                    {renderGoogleLogin()} */}
                </ScrollView>
            {/* </LinearGradient> */}
            {/* {renderAreaCodesModal()} */}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    text:{
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 48,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginBottom: 10,
        color: '#051d5f',
    }
})

export default Login
