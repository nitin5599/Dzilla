import React, {useState} from 'react'
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
    Pressable,
    ScrollView,
    Alert
} from 'react-native'
import { icons, images, COLORS, SIZES, FONTS} from '../constants'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({navigation}) => {
    
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)    
    
    const [showPassword, setShowPassword] = React.useState(false)
    
    // const navigation = useNavigation()
    const [areas, setAreas] = React.useState([])
    const [selectedArea, setSelectedArea] = React.useState(null)
    const [modalVisible, setModalVisible] = React.useState(false)

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

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");

    const submitHandler = async(e) => {
        e.preventDefault();   
        if(name && email && password){
            try {
                const headers = {
                    'Content-Type': 'application/json'
                }

                setLoading(true)

                const user = JSON.stringify({
                    name,
                    email,
                    password,
                    pic
                })
                
                const config = {
                    method: 'POST',
                    headers: headers,
                    body: user
                }

                const response =  await fetch('https://dzilla.herokuapp.com/api/users/', config)
                const data = await response.json();
               
                if(data.message === 'User already exists'){
                    Alert.alert('Please login', data.message)
                }
                else{
                    try {
                        const userdata = {
                            name: name,
                            email: email,
                            pic: pic,
                            token: data.token
                        }
                        await AsyncStorage.setItem('UserData', JSON.stringify(userdata));
                        console.log(await AsyncStorage.getItem('UserData'))
                        navigation.navigate('Stores');
                    } catch (error) {
                        console.log(error);
                    }
                    // AsyncStorage.setItem('token', data.token)
                    // const key =  await AsyncStorage.getItem('token');
                    // if(key)
                        // navigation.navigate('Stores')
                }

                setLoading(false)
            } 
            catch (error) {
                console.error("getting error - ", error)
            }
        }else{
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
                {/* Full Name */}
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Name</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Name"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

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
            <View style={{marginVertical: SIZES.padding * 3,
             marginHorizontal: SIZES.padding * 6}}>
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
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Continue</Text>
                </TouchableOpacity>
            </View>
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
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Already a user? Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradient>
            {/* {renderAreaCodesModal()} */}
        </KeyboardAvoidingView>
    )
}

export default SignUp
