import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Todo from './src/components/Todo';
import TodoLink from './src/components/TodoLink';
import List from './src/components/List';
import {storeData, getData, removeValue} from './src/utils/storage';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [listShowing, setListShowing] = useState([]);
  const [mainPage, setMainPage] = useState(true);

  useEffect(() => {
    //removeValue()
    getData()
    .then(items => setTodoList(items))
  }, [])

  useEffect(() => {
    storeData(todoList);
  }, [todoList])

  const onAddHandler = () => {
    if (inputText === '')
      return;
    if (mainPage){
      const newItem = {
        title: inputText,
        list: []
      }
      setTodoList([...todoList, newItem])
    }else{
      const newItem = {
        checked: false,
        text: inputText
      }
      setListShowing([...listShowing, newItem])
    }
    setInputText('');
  }

  const onNewDayHandler = () => {
    let currentTodoList = [...todoList];
    currentTodoList.map(item => {
      item.checked = false;
    });
    setTodoList(currentTodoList);
  }

  const onCheckboxHandler = (indexToModify, toggleValue) => {
    let currentTodoList = [...todoList];
    currentTodoList[indexToModify].checked = toggleValue;
    setTodoList(currentTodoList);
  }

  const onDeleteHandler = (indexToDelete) => {
    setTodoList(currentTodoList => { 
      return currentTodoList.filter((_, index) => index !== indexToDelete);
    });
  }

  const onEditHandler = (indexToModify, text) => {
    let currentTodoList = [...todoList];
    currentTodoList[indexToModify].text = text;
    setTodoList(currentTodoList);
  }

  const onBackHandler = () => {
    setMainPage(true);
  }

  const renderItem = ({item, index}) => {
    if (mainPage)
    {
      return (
        <TouchableOpacity
          onPress={() => {
            setListShowing(item.list);
            setMainPage(false);
          }}
        >
          <TodoLink 
            item={item}
            index={index} 
            onDelete={onDeleteHandler} 
          />
        </TouchableOpacity>
      )
    }
    return (
      <Todo 
        item={item} 
        index={index} 
        onDelete={onDeleteHandler} 
        onCheck={onCheckboxHandler} 
        onEdit={onEditHandler}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput 
          value = {inputText}
          onChangeText = {item => setInputText(item)}
          onSubmitEditing = {onAddHandler}
          style={styles.input}
        />
        <Button 
          title="Add" 
          color="#008577"
          onPress={onAddHandler}
        />
      </View>
      {mainPage
      ? <FlatList 
        removeClippedSubviews={false}
        data={todoList}
        extraData={todoList}
        keyExtractor={(item, index) => item.title+index}
        style={styles.list}
        renderItem={(item, index) =>renderItem(item, index)}
      />
      : <FlatList 
          removeClippedSubviews={false}
          data={listShowing}
          extraData={listShowing}
          keyExtractor={(item, index) => item.text+index}
          style={styles.list}
          renderItem={(item, index) =>renderItem(item, index)}
        />
      }
      {!mainPage &&
        <View style={{flexDirection: "row", justifyContent: "space-around", width: "100%"}}>
          <Button 
            title="Menu" 
            color="#008577"
            onPress={onBackHandler}
          />
          <Button 
            title="New Day" 
            color="#008577"
            onPress={onNewDayHandler}
          />
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: "5%",
    flex: 1,
    alignItems: 'center',
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5
  },
  input: {
    flex: 1,
    borderWidth: 1,
    marginRight: 5,
    paddingHorizontal: 5,
    paddingVertical: 0
  },
  list: {
    width: "100%",
  }
});
