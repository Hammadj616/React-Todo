import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, isEditing: false }]);
      setNewTask("");
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index].text);
  };

  const saveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editedTask;
    updatedTasks[index].isEditing = false;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditedTask("");
  };

  const cancelEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isEditing = false;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditedTask("");
  };

  return (
    <div className="App">
      <h1>ToDo App</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.isEditing ? (
              <div>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>Save</button>
                <button onClick={() => cancelEdit(index)}>Cancel</button>
              </div>
            ) : (
              <div>
                {task.text}
                <button onClick={() => startEdit(index)}>Edit</button>
                <button onClick={() => removeTask(index)}>Remove</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
