import React, {useState, useEffect} from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    SafeAreaView,
    FlatList,
    StyleSheet,
    Pressable,
    Alert,
    RefreshControl,
    ActivityIndicator,
    ScrollView
 } from 'react-native'
import { COLORS, icons, images, FONTS, SIZES } from "../constants"
import { CategoryCard, TrendingCard,  } from "../components";
import { trendingOffers } from '../constants/trendingOffers'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stores = ({navigation}) => {
    
    const [isLoading, setLoading] = useState(false);

    const [status, setStatus] = useState('All')
    const [datalist, setDataList] = useState([]);

    const fetchCategoriesData = () => {
        setLoading(true)
        fetch('https://dzilla.herokuapp.com/api/category/')
         .then((response) => response.json())
         .then((json) => {
            setCategoriesData(json)
        })
         .catch((error) => {
            console.error(error)
            Alert.alert("Err", "Something went wrong!")    
        }).finally(()=>setLoading(false))
    } 

    const fetchListData = async () => {
        // try {
        //     const response = await fetch('https://dzilla.herokuapp.com/api/product/');
        //     const responseData = await response.json();
        //     setDataList(responseData)
        //     console.log('Product api Response - ',responseData)
        // } catch (error) {
        //     console.log(error)
        // }
        // setLoading(true)
        await fetch('https://dzilla.herokuapp.com/api/product/')
        .then((response) => response.json())
        .then((json) => {
            setDataList(json)
            console.log('Product api Response - ',datalist)
            // ListCategories()
          })
        .catch((error) => console.error(error))
        // .finally(()=>setLoading(false))
    }

    useEffect(() => {
        fetchCategoriesData()
        fetchListData()
    }, [])
    
    function renderHeader(){
        return (
            <View
                style={{
                    flexDirection:'row',
                    marginHorizontal: 10,
                    alignItems:'center',
                    height:80
                }}
            >
                {/* Text */}

                <View
                    style={{
                        flex:1
                    }}
                >
                {renderSearchBar()}
                </View>
                
                {/* Image */}

                <TouchableOpacity
                    onPress={()=> navigation.navigate('wishlist')}
                >
                    <Image
                        source={icons.wishlist}
                        style={{
                            width:40,
                            height:40,
                            // borderRadius:20
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderSearchBar(){
        return (
            <View
                style={{
                    flexDirection:'row',
                    height:50,
                    alignItems:'center',
                    marginHorizontal: SIZES.padding,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: 10,
                    backgroundColor: COLORS.lightGray
                }}
            >
                <Image
                    source={icons.search}
                    style={{
                        width:20,
                        height:20,
                        tintColor: COLORS.gray
                    }}
                />
                
                <TextInput
                    style={{
                        marginLeft: SIZES.radius*4,
                        ...FONTS.body2
                    }}
                    placeholderTextColor={COLORS.gray}
                    placeholder="Search for a shop"
                />
            </View>
        )
    }

    function renderTrendingSection(){
        return (
            <View 
                style={{
                    marginTop:20,
                }}
            >
                <Text
                    style={{
                        marginHorizontal: 15,
                        ...FONTS.h2
                    }}
                >Trending Offers</Text>

                <FlatList
                    data={trendingOffers}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({item, index}) => {
                        return (
                            <TrendingCard
                                containerStyle={{
                                    marginLeft: index == 0 ? SIZES.padding : 0
                                }}
                                recipeItem={item}
                                key={index}
                            />
                        )
                    }}
                />
            </View>
        )
    }

    const [categoriesData, setCategoriesData] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));        
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchListData()
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const ListItem = ({ item }) => {
        return (
          <View style={styles.item} key={item._id}>
            <Image
              source={{uri: item.categoryImage}}
              style={styles.itemPhoto}
              resizeMode="cover"
            />
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        );
    };

    const renderCategoryList = ({item, index}) => {
        return (
            <ListItem 
                containerStyle={{
                    margin: SIZES.padding 
                }}
                item={item} 
                key={index}
            />
        )
    }
    
    function renderCategories(){
        return (
            <View 
                style={{
                    marginTop:20,
                }}
            >
                <Text
                    style={{
                        marginHorizontal: 18,
                        ...FONTS.h2
                    }}
                >Categories</Text>

                <FlatList
                    // refreshing={isLoading}
                    // onRefresh={()=>fetchCategoriesData()}
                    data={categoriesData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={renderCategoryList}
                />
            </View>
        )
    }

    const categoryList = [
        {status:'All' },
        {status:'Visited' },
        {status:'Favorites' }
    ];

    // useEffect(() => {
    //     setDataFilter(status)
    //     // fetchListData()
    // }, [status]);
    
    const setDataFilter = (currentStatus) => {
        // console.log('DATALIST - ', datalist)
        // if(currentStatus !== 'All'){
            setDataList([...datalist.filter((e) => e.status == currentStatus)])
            console.log(`DATALIST of ${currentStatus} - `, datalist)
        // }else if(currentStatus === 'All'){
        //     setDataList([...datalist.filter(e => e.status === currentStatus)])
        // }
            setStatus(currentStatus)
            return [datalist]
    }
    
    const ListCategories = () => {
 {/* <Pressable
                    key={index}
                    onPress={() => setDataFilter(e.status)}
                > */}
        return (
            <View style={styles.categoryListContainer}>
                {categoryList.map((e, index) => (
               
                    <Text
                        key={index}
                        onPress={() => setDataFilter(e.status)}
                        style={[
                            styles.categoryListText,
                            e.status == 'Visited' ? styles.visitedTab : null,
                            e.status == status && styles.activeCategoryListText
                        ]}
                    >
                        {e.status}
                    </Text>
                ))}
            </View>
        );
    };
{/* </Pressable> */}
                
    const forNoList = () => {
        return(
            <View>
                <Text style={{color: 'black'}}>
                No shops at all
                </Text>
            </View>
        )
    }

    const checkWishlist= async (item)=>{
        console.log('item - ', item)
        try {
            if(item._id == '60ffdafc5220aa00040b2642')
            {
                let pro = [];
                pro.push(item);
                AsyncStorage.setItem('wishlist', pro);
            }    
            // let allproducts = [];
            // const arr = await AsyncStorage.getItem('wishlist');
            // allproducts=[...JSON.parse(arr)];
            // console.log('wishlist - ',allproducts)
            // for (let index = 0; index < allproducts.length; index++) {
            //     if(allproducts[index]._id === item._id) 
            //        return true
            // }
            // return false;
            // const res = [...allproducts.filter((e) => e._id === item._id)]
            // console.log(item.name, '=>', res)
        } catch (error) {
            console.log('wishlist error - ',error)
        }        
        return true;
    }

    const renderItem = ({item, index}) => {
        return (
            datalist.length > 0 ? 
                <CategoryCard
                    containerStyle={{
                        marginHorizontal: SIZES.padding,
                    }}
                    categoryItem={item}
                    wishlist={checkWishlist(item)}
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
                            <View>
                                {renderHeader()}
                                
                                {renderCategories()}
                                
                                {renderTrendingSection()}

                                {/* {ListCategories()} */}
                                <View style={{
                                    marginTop:20,
                                }}>                
                                    <Text
                                        style={{
                                            marginHorizontal: 15,
                                            ...FONTS.h2
                                        }}
                                    >Show Now</Text>
                                </View>
                            </View>
                        }
                        extraData={datalist}
                        renderItem={renderItem}
                        ListFooterComponent={<View style={{marginBottom:120}}/>}
                    />
                </SafeAreaView>
            }
        </>
    )
}

/* STYLES */
            
const styles = StyleSheet.create({

    categoryListText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 5,
        color: COLORS.black,
    },
    activeCategoryListText: {
        color: COLORS.darkGreen,
        borderBottomWidth: 2,
        paddingBottom: 5,
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
    },
    categoryListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        marginLeft: 20,
        paddingHorizontal: 40,
        paddingVertical: 20,
    },
    visitedTab : {
        marginLeft: 20
    },
    item: {
        margin: 20 ,
        textAlign:'center',
    },
    itemPhoto: {
      width: 100,
      height: 100,
      borderRadius: 50
    },
    itemText: {
      color: COLORS.black,
      flexDirection:'row',
      textAlign:'center',
      marginTop: 15,
      fontSize: 18,
    },
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})

export default Stores
