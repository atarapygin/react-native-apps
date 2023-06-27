import {useState} from 'react'
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/Goallitem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function addGoalHandler(enteredGoalText) {
    setCourseGoals(prevValue => [...prevValue, {text: enteredGoalText, id: Math.random().toString()}]);
    setModalIsVisible(false);
  };

  function deleteGoalHandler(id) {
    setCourseGoals(prevValue => prevValue.filter(item => item.id !== id))
  }

  function startAddGoalHandler() {
    setModalIsVisible(true)
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button title='Add New Goal' color='#5e0acc' onPress={startAddGoalHandler}/>
        <GoalInput onAddGoal={addGoalHandler} visible={modalIsVisible} onCancel={() => setModalIsVisible(false)} />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={itemData => {
              return (
                <GoalItem
                  onDelete={() => deleteGoalHandler(itemData.item.id)}
                  text={itemData.item.text}
                />
              )
            }}
            keyExtractor={(item) => item.id}
            alwaysBounceVertical={false}
          >
          </FlatList>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5
  },
});
