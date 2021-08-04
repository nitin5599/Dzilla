import React,{useEffect,useState} from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    SafeAreaView,
    FlatList,
    StyleSheet,
    RefreshControl,
    ActivityIndicator
 } from 'react-native'
import { CategoryCard } from "../components";
import { COLORS, icons, images, FONTS, SIZES, dummyData } from "../constants"

import AsyncStorage from "@react-native-async-storage/async-storage";

const wishlist = () => {
    
    const [isLoading, setLoading] = useState(false);
    const [datalist, setDataList] = useState([]);

    const fetchData = async() => {        
        try {
            const myArray = await AsyncStorage.getItem('wishlist');
            if (myArray !== null) {
              // We have data!!
              setDataList(JSON.parse(myArray))
              console.log('wishlist products - ',JSON.parse(myArray));
            }
          } catch (error) {
            console.log(error)
            // Error retrieving data
        }    
    }

    useEffect(async() => {
        setLoading(true)
        fetchData()
        setLoading(false)
    }, [])    

    const renderItem = ({item, index}) => {
        return (
            datalist.length > 0 ? 
                <CategoryCard
                    containerStyle={{
                        marginHorizontal: SIZES.padding,
                    }}
                    categoryItem={item}
                    key={index}
                    onPress={() => navigation.navigate('gotostore', {storeImage: item.fileName})}
                /> :
                <View style={{marginBottom:120}}>
                    <Image source={icons.refer} style={{marginBottom: 50, height: 50, width: 50}}/>
                    <Text style={{color: 'black'}}>
                        No shops at all
                    </Text>
                </View>
        )
    }

    const [refreshing, setRefreshing] = useState(false);
    
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));        
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData()
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <>
            { isLoading 
                ?
                <ActivityIndicator style={{flex: 1,justifyContent:'center'}} 
                    size="small" color="#0000ff" />
                :         
                <SafeAreaView
                    style={{
                        flex:1,
                        backgroundColor: COLORS.white
                    }}
                >
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        data={datalist}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={
                            <View 
                                style={{
                                    marginTop:20,
                                }}
                            >
                                <Text 
                                    style={{
                                        marginHorizontal: 15,
                                        textAlign:'center',
                                        ...FONTS.h2
                                    }}
                                >My Wishlist</Text>
                            </View>
                        }
                        renderItem={renderItem}
                        ListFooterComponent={<View style={{marginBottom:120}}/>}
                    />
                </SafeAreaView>
            }
        </>
    )
}

export default wishlist
