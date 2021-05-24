import React from 'react'
import { FlatList } from 'react-native'

const List = ({listData, text}) => {
    return (
        <FlatList 
          removeClippedSubviews={false}
          data={listData}
          extraData={listData}
          keyExtractor={(item, index) => text+index}
          style={styles.list}
          renderItem={(item, index) =>renderItem(item, index)}
        />
    )
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

export default List
