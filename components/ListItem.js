import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { COLORS, icons, images, FONTS, SIZES, data, dummyData } from "../constants"

const ListItem = ({Item}) => {
    return (
        <View style={styles.item} key={Item._id}>
            <Image
                source={{uri: Item.categoryImage}}
                style={styles.itemPhoto}
                resizeMode="cover"
            />
            <Text style={styles.itemText}>{Item.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({    
    item: {
        margin: 20,
        textAlign:'center',
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
        fontSize: 18,
    },
})

export default ListItem
