import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const TodoLink = ({item, index, onDelete}) => {
    return (
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text>
                    {item.title}
                </Text>
                <TouchableOpacity onPress={() => onDelete(index)} style={{justifyContent: "center"}}>
                    <View style={{paddingVertical: 6, paddingLeft: 10, paddingRight: 2}}>
                        <Text>X</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TodoLink

