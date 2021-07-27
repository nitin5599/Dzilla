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
    Animated,
    ActivityIndicator,
    RefreshControl
 } from 'react-native'
import { COLORS, icons, images, FONTS, SIZES, data, dummyData } from "../constants"
import { CategoryCard, TrendingCard,  } from "../components";

const Stores = ({navigation}) => {

    const [refresh, setRefresh] = useState(false)

    const onRefresh = () => {
        setRefresh(true)        
        ListCategories()
        // fetch('https://dzilla.herokuapp.com/api/product/')
        //   .then((response) => response.json())
        //   .then((json) => {setDataList(json), ListCategories()})
        //   .catch((error) => console.error(error))
        //   .finally(() => setLoading(false));
        setRefresh(false)        
    }

    const categoriesData = [
        {
            id: 1,
            icon: icons.marketplaces,
            // color: COLORS.purple,
            // backgroundColor: COLORS.lightpurple,
            description: "Market Places"
        },
        {
            id: 2,
            icon: icons.electronics,
            // color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "Electronics"
        },
        {
            id: 3,
            icon: icons.clothing,
            // color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "Clothing"
        },
        {
            id: 4,
            icon: icons.decor,
            // color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "Home Decor"
        },
        {
            id: 5,
            icon: icons.sports,
            // color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "Sports"
        },
        {
            id: 6,
            icon: icons.books,
            // color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "Books"
        },
        {
            id: 7,
            icon: icons.fitness,
            // color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "Fitness"
        },
        {
            id: 8,
            icon: icons.more,
            // color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "More"
        },
    ]
     
    
    // const [features, setFeatures] = useState(categoriesData)

    // function renderFeatures() {

    //     const Header = () => (
    //         <View style={{ marginBottom: SIZES.padding * 2 }}>
    //             <Text style={{ ...FONTS.h3 }}>Features</Text>
    //         </View>
    //     )

    //     const renderItem = ({ item }) => (
    //         <TouchableOpacity
    //             style={{ marginBottom: SIZES.padding * 2, width: 60, alignItems: 'center' }}
    //             onPress={() => console.log(item.description)}
    //         >
    //             <View
    //                 style={{
    //                     height: 50,
    //                     width: 50,
    //                     marginBottom: 5,
    //                     borderRadius: 20,
    //                     backgroundColor: item.backgroundColor,
    //                     alignItems: 'center',
    //                     justifyContent: 'center'
    //                 }}
    //             >
    //                 <Image
    //                     source={item.icon}
    //                     resizeMode="contain"
    //                     style={{
    //                         height: 20,
    //                         width: 20,
    //                         tintColor: item.color
    //                     }}
    //                 />
    //             </View>
    //             <Text 
    //                 style={{ textAlign: 'center', flexWrap: 'wrap',
    //                  ...FONTS.body4 }}>{item.description}</Text>
    //         </TouchableOpacity>
    //     )

    //     return (
    //         <FlatList
    //             ListHeaderComponent={Header}
    //             data={features}
    //             numColumns={4}
    //             columnWrapperStyle={{ justifyContent: 'space-between' }}
    //             keyExtractor={item => `${item.id}`}
    //             renderItem={renderItem}
    //             style={{ margin:SIZES.padding}}
    //         />
    //     )
    // }

    function renderHeader(){
        return (
            <View
                style={{
                    flexDirection:'row',
                    marginHorizontal: 10,
                    alignItems:'center',
                    height:80,
                    // paddingHorizontal: 15
                }}
            >
                {/* Menu */}
                
                {/* <TouchableOpacity
                    onPress={() => navigation.toggleDrawer() }
                >
                    <Image
                        source={icons.menu}
                        style={{
                            width:40,
                            height:40
                        }}
                    />
                </TouchableOpacity> */}

                {/* Text */}

                <View
                    style={{
                        flex:1
                    }}
                >
                {renderSearchBar()}
                    {/* <Text
                        style={{
                            color: COLORS.darkGreen,
                            ...FONTS.h2
                        }}
                    >
                        Hello, Nitin
                    </Text>
                    <Text
                        style={{
                            marginTop:3,
                            color: COLORS.gray,
                            ...FONTS.body3
                        }}
                    >
                        What do you want to cook today?
                    </Text> */}
                </View>
                
                {/* Image */}

                <TouchableOpacity
                    onPress={()=> console.log('profile')}
                >
                    <Image
                        source={icons.bell}
                        style={{
                            width:40,
                            height:40,
                            borderRadius:20
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

    function renderSeeRecipeCard(){
        return (
            <View
                style={{
                    flexDirection:'row',
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    borderRadius: 10,
                    backgroundColor:COLORS.lightGreen,
                    padding:5
                }}
            >
                {/* Image */}

                <View
                    style={{
                        width:100,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={images.recipe}
                        style={{
                            width:80,
                            height:80
                        }}
                    />
                </View>

                {/* Text */}

                <View
                    style={{
                        flex:1,
                        paddingVertical: SIZES.radius
                    }}
                >
                    <Text
                        style={{
                            width: "70%",
                            ...FONTS.body3
                        }}
                    >
                        You have 12 recipes that you haven't tried yet
                    </Text>

                    <TouchableOpacity
                        style={{
                            marginTop:8
                        }}
                        onPress={() => console.log('see recipes')}
                    >
                        <Text
                            style={{
                                color: COLORS.darkGreen,
                                textDecorationLine: 'underline',
                                fontSize:16
                            }}
                        >See Recipes</Text>
                    </TouchableOpacity>
                </View>

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
                    data={dummyData.trendingRecipes}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({item, index}) => {
                        return (
                            <TrendingCard
                                containerStyle={{
                                    marginLeft: index == 0 ? SIZES.padding : 0
                                }}
                                recipeItem={item}
                                onPress={() => navigation.navigate('Recipe', 
                                    {recipe: item}) }
                            />
                        )
                    }}
                />
            </View>
        )
    }

    const ListItem = ({ item }) => {
        return (
          <View style={styles.item}>
            <Image
              source={item.icon}
              style={styles.itemPhoto}
              resizeMode="cover"
            />
            <Text style={styles.itemText}>{item.description}</Text>
          </View>
        );
    };

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
                    data={categoriesData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item, index }) => <ListItem 
                        containerStyle={{
                            margin: SIZES.padding 
                        }}
                        item={item} 
                        onPress={() => navigation.navigate('Recipe', 
                            item) 
                        }
                    />}
                />
            </View>
        )
    }

    // function renderCategoryHeader(){
    //     return (
    //         <View
    //             style={{
    //                 flexDirection:'row',
    //                 alignItems:'center',
    //                 marginTop:20,
    //                 marginHorizontal: SIZES.padding
    //             }}
    //         >
    //             {/* Section Title */}
                
    //             <Text
    //                 style={{
    //                     flex:1,
    //                     ...FONTS.h2
    //                 }}
    //             >Categories</Text>

    //             {/* View All */}

    //             <TouchableOpacity>
    //                 <Text
    //                     style={{
    //                         color: COLORS.darkGreen,
    //                         ...FONTS.body4
    //                     }} 
    //                 >View All</Text>
    //             </TouchableOpacity>

    //         </View>

            
    //     )
    // }

    const categoryList = [
        {
            id:1,
            status:'All'
        },
        {
            id:2,
            status:'Visited'
        },
        {
            id:3,
            status:'Favorites'
        }
    ];

    
    // const DATA = [
    //     {
    //         id:'1',
    //         name: 'Ajio',
    //         image: images.ajio,
    //         cashback:'12.0%',
    //         category: 'Home, Garden & Decoration',
    //         status: 'All' 
    //     },
    //     {
    //         id:'2',
    //         name: 'Myntra',
    //         image: images.myntra,
    //         category: 'Clothing & Shoes',
    //         cashback:'8.6%',
    //         status: 'All' 
    //     },
    //     {
    //         id:'3',
    //         name: 'Zivame',
    //         image: images.zivame,
    //         cashback:'8.0%',
    //         category: 'Clothing & Shoes, Jewellry & Accessories',
    //         status: 'Visited' 
    //     },
    //     {
    //         id:'4',
    //         name: 'Limeroad',
    //         image: images.limeroad,
    //         category: 'Marketplaces',
    //         cashback:'12.6%',
    //         status: 'Favorites' 
    //     },
    // ]

        
    const [status, setStatus] = useState('All')
    const [datalist, setDataList] = useState([]);
    
    const [isLoading, setLoading] = useState(true);
    
    useEffect(() => {
        // setLoading(true)
        fetch('https://dzilla.herokuapp.com/api/product/')
          .then((response) => response.json())
          .then((json) => {setDataList(json), ListCategories()})
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
    }, [status]);
    
    const ListCategories = () => {

        const setDataFilter = status => {
            // if(status == 'All'){
                setDataList([...datalist.filter(e => e.status === status)])
                // console.log(status)
            // }
            // else if(status == 'Visited'){
            //     setDataList([...datalist.filter(e => e.status === status)])
            //     // console.log(status)
            // }
            // else if(status == 'Favorites'){
            //     setDataList([...datalist.filter(e => e.status === status)])
            //     // console.log(status)
            // }
            // setStatus(status)
        }
    
        // const [selectedCategoryIndex, setSelectedCategoryIndex] = useState('All');
        return (
        <View style={styles.categoryListContainer}>
            {categoryList.map((e) => (
            <Pressable
                key={e.id}
                onPress={() => {setStatus(e.status), setDataFilter(e.status)}}>
                <Text
                style={[
                    styles.categoryListText,
                    e.status == 'Visited' ? styles.visitedTab : null,
                    e.status == status && styles.activeCategoryListText,
                    // index==1 ? styles.visitedTab : null,
                    // index == selectedCategoryIndex && styles.activeCategoryListText,
                ]}>
                {e.status}
                </Text>
            </Pressable>
            ))}
        </View>
        );
    };

    const renderItem = ({item, index}) => {
        return (
            <CategoryCard
                containerStyle={{
                    marginHorizontal: SIZES.padding
                }}
                categoryItem={item}
                onPress={() => navigation.navigate('webView')}
            />
        )
    }
    
    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor: COLORS.white
            }}
        >
        {isLoading ? 
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
             :  
            (<FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={onRefresh}
                    />
                }
                data={datalist}
                keyExtractor={item => `${item.id}`}
                keyboardDismissMode='on-drag'
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* Header */}
                        {renderHeader()}
                        
                        {/* Featured */}
                        {/* {renderFeatures()} */}

                        {/* See Recipe Card */}
                        {/* {renderSeeRecipeCard()} */}

                        {renderCategories()}
                        
                        {/* Trending Section */}
                        {renderTrendingSection()}

                        {ListCategories()}
                        
                        {/* Category Header */}
                        {/* {renderCategoryHeader()} */}
                        
                    </View>
                }
                renderItem={renderItem}
                // renderItem={({item})=>{
                //     return(
                //         <CategoryCard
                //             containerStyle={{
                //                 marginHorizontal: SIZES.padding
                //             }}
                //             categoryItem={item}
                //             onPress={() => navigation.navigate('this product', item)}
                //         />
                //     )
                // }}
                ListFooterComponent={
                    <View style={{marginBottom:120}}/>
                }
            />)
        }
        </SafeAreaView>
    )
}

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
      margin: 20,
      textAlign:'center',
    //   backgroundColor: COLORS.lightpurple
    },
    itemPhoto: {
      width: 140,
      height: 140,
      borderRadius: 70
    },
    itemText: {
      color: COLORS.black,
      flexDirection:'row',
      textAlign:'center',
      marginTop: 15,
    //   marginHorizontal: 25,
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
