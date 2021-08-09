import React, {useState, useEffect} from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Alert
} from 'react-native'
import axios from 'axios'; 
import { icons, images, COLORS, SIZES, FONTS} from '../constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
    
    const [showPassword, setShowPassword] = React.useState(false)
    const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setLoading] = useState(false)

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
                    console.log('LOGIN RESPONSE - ', response) 
                    let localuserdata = {
                        userid: response.data._id,
                        name: response.data.name,
                        email: response.data.email,
                        wallet: response.data.wallet,
                        pic: pic,
                        token: response.data.token
                    };
                    console.log('localuserdata - ', localuserdata)
                    const jsonValue = JSON.stringify(localuserdata)
                    AsyncStorage.setItem('UserData', jsonValue);
                    navigation.navigate('Stores') 
                })
                .catch(err=>{
                    console.log(err);
                    if(err == 404)
                        Alert.alert('Alert', "User doesn't exists!")
                })
                .finally(()=>setLoading(false))
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
            </View>
        )
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
                            ...FONTS.body4
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
                            ...FONTS.body4
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
             marginHorizontal: SIZES.padding * 7 }}>
                <TouchableOpacity
                    onPress={submitHandler}
                    style={{
                        height: 50,
                        backgroundColor: COLORS.black,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
                        {isLoading ? 
                            <ActivityIndicator size="small" color="#fff" /> 
                            : 'Login'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 , backgroundColor:'white'}}
        >
                <ScrollView>
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
                            <Text style={{ color: COLORS.black, ...FONTS.body4 }}>Not a member? Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
