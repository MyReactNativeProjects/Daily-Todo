import React, {useState} from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import CheckBox from '@react-native-community/checkbox';

const Todo = ({item, index, onDelete, onCheck, onEdit}) => {
    const [text, setText] = useState(item.text);

    return (
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <CheckBox
                    style={{marginLeft: -6}}
                    disabled={false}
                    value={item.checked}
                    onValueChange={(newValue) => (
                        onCheck(index, newValue)
                    )}
                />

                <TextInput
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={() => onEdit(index, text)}
                />
            </View>
            <TouchableOpacity onPress={() => onDelete(index)} style={{justifyContent: "center"}}>
                <View style={{paddingVertical: 6, paddingLeft: 10, paddingRight: 2}}>
                    <Text>X</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Todo
