// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error('Error caught by error boundary:', error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Return an error message or fallback UI
      return (
        <div>
          <h1>An error occurred.</h1>
          <p>Please try refreshing the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}


function FrontendApp() {
  const host = process.env.REACT_APP_API_URL;
  console.log(host);
  var headers = {};
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [showCompleted, setShowCompleted] = useState(true);

  // Filter tasks based on completion status, (after checking tasks has values)
  const filteredTasks =
  showCompleted && Array.isArray(tasks)
    ? tasks
    : (Array.isArray(tasks) ? tasks : []).filter(task => !task.completed);


  // Fetch tasks from the API on component mount
  useEffect(() => {
    fetchTask()
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  // Fetch tasks and repopulate list
  const fetchTask = () => {
    fetch(`${host}`)
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => {
        throw new Error(`Error fetching tasks: ${error}`);
      });
  };

  // Add a new task to the list
  const addTask = () => {
    fetch(`${host}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then(response => response.json())
      .then(() => {
        // Update the task list with the modified task, by re-fetching task list
        fetchTask()
      })
      .catch(error => {
        throw new Error(`Error fetching tasks: ${error}`);
      });

    // Clear input fields after adding a new task
    setNewTask({ title: '', description: '' });
  };

  // Mark a task as completed
  const markAsCompleted = (id) => {
    const url = `${host}/${id}`;
    fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: headers,
    })
      .then(response => response.json())
      .then(updatedTask => {
        // Update the task list with the modified task, by re-fetching task list
        fetchTask()
      })
      .catch(error => {
        throw new Error(`Error fetching tasks: ${error}`);
      });
  };

  return (
    <ErrorBoundary>
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
          <br />
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
          {/* Iterate through filtered tasks and display them. If there are no results, or there is a DB error, show No tasks to display instead */}
          {Array.isArray(filteredTasks) && filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
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
            ))
          ) : (
            <li>No tasks to display</li>
          )}
        </ul>
      </div>
    </ErrorBoundary>
  );
}

export default FrontendApp;
