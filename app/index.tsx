import { useState } from "react";
import { Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from "react-native";

const Home = () => {

  const [input, setInput] = useState('');
  const [todo, setTodo] = useState(['Sample Todo']);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateInput, setUpdateInput] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // addTodo
  const addTodo = () => {
    console.log(input);
    todo.push(input);
    setTodo([...todo]);
    setInput('');
  };

  // deleteTodo
  const deleteTodo = (index) => {
    console.log('todo deleted', index);
    todo.splice(index, 1);
    setTodo([...todo]);
  };

  // editTodo
  const editTodo = () => {
    console.log(updateInput, selectedIndex);
    todo.splice(selectedIndex, 1, updateInput);
    setTodo([...todo]);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todo App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a new todo"
        value={input}
        onChangeText={setInput}
      />

      <TouchableOpacity style={styles.addButton} onPress={addTodo}>
        <Text style={styles.addButtonText}>Add Todo</Text>
      </TouchableOpacity>

      <FlatList
        data={todo}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => deleteTodo(index)}
              >
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  setSelectedIndex(index); // Fix here
                  setUpdateInput(item); // Fix here
                  setModalVisible(true);
                }}
              >
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No todos yet...</Text>}
      />

      {/* Edit Todo Modal */}
      {modalVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Todo</Text>
              <TextInput
                style={styles.input}
                value={updateInput}
                onChangeText={setUpdateInput}
              />
              <Pressable style={styles.saveButton} onPress={editTodo}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: '#DDD',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  todoItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
    borderColor: '#DDD',
    borderWidth: 1,
  },
  todoText: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 10,
    backgroundColor: '#FF5722',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  actionButtonText: {
    color: 'white',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
