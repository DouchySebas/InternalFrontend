// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file

function FrontendApp() {
  const PORT = 3001;
  const host = `localhost:${PORT}`;
  var headers = {};
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [showCompleted, setShowCompleted] = useState(true);

  // Filter tasks based on completion status
  const filteredTasks = showCompleted
    ? tasks
    : tasks.filter(task => !task.completed);

  // Fetch tasks from the API on component mount
  useEffect(() => {
    fetch(`http://${host}/api/tasks`)
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  // Add a new task to the list
  const addTask = () => {
    fetch(`http://${host}/api/tasks`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then(response => response.json())
      .then(data => setTasks([...tasks, data]))
      .catch(error => console.error('Error adding task:', error));

    // Clear input fields after adding a new task
    setNewTask({ title: '', description: '' });
  };

  // Mark a task as completed
  const markAsCompleted = (id) => {
    const url = `http://${host}/api/tasks/${id}`;
    fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: headers,
    })
      .then(response => response.json())
      .then(updatedTask => {
        // Update the task list with the modified task
        setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
      })
      .catch(error => console.error('Error marking task as completed:', error));
  };

  return (
    <div className="task-list-container">
      <div>
        <h2>Add New Task</h2>

        {/* Multiline input for Title */}
        <textarea
          placeholder="Title"
          value={newTask.title}
          onChange={e => setNewTask({ ...newTask, title: e.target.value })}
          rows="4"
        />

        {/* Multiline input for Description */}
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={e => setNewTask({ ...newTask, description: e.target.value })}
          rows="4"
        />
        <br/>
        {/* Button to Add task */}
        <button onClick={addTask}>Add Task</button>
      </div>

      <h2>Task List</h2>

      <div>
        {/* Button to show all tasks */}
        <button onClick={() => setShowCompleted(true)}>Show All Tasks</button>
        {/* Button to show uncompleted tasks */}
        <button onClick={() => setShowCompleted(false)}>Show Uncompleted Tasks</button>
      </div>

      <ul className="task-list">
        {/* Iterate through filtered tasks and display them */}
        {filteredTasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            {/* Display task title and description */}
            <strong>{task.title}</strong> - {task.description}<br />
            {/* Display task completion status */}
            Status: {task.completed ? 'Completed' : 'Pending'}
            <div>
              {/* Button to mark a task as completed */}
              {!task.completed && <button onClick={() => markAsCompleted(task.id)}>Mark as Completed</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FrontendApp;
