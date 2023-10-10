import React, { useState } from 'react';
import './TodoList.css';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationColor, setNotificationColor] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [editingIndex, setEditingIndex] = useState(null); // Track the index of the task being edited

    const handleTaskSubmit = (e) => {
        e.preventDefault();
        if (taskInput.trim() !== '') {
            setTasks([...tasks, { text: taskInput, completed: false }]);
            setTaskInput('');
            showPopUp('Task added successfully!', 'green');
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    const deleteTask = (index, e) => {
        e.stopPropagation(); // Prevent event propagation to the list item
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
        showPopUp('Task removed successfully!', 'red');
    };


    const editTask = (index, newText) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].text = newText;
        setTasks(updatedTasks);
        setEditingIndex(null); // Reset editing state
    };

    const showPopUp = (message, color) => {
        setNotificationMessage(message);
        setNotificationColor(color);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 2000); // Automatically close the notification after 2 seconds
    };

    return (
        <div className="todo-container">
            {showNotification && (
                <div className={`notification ${notificationColor}`}>
                    {notificationMessage}
                </div>
            )}
            <h2>To-Do List</h2>
            <div className="todo-box">
                <ul>
                    {tasks.map((task, index) => (
                        <li
                            key={index}
                            className={`task-item ${task.completed ? 'completed' : ''}`}
                            onClick={() => toggleTaskCompletion(index)}
                        >
                            {editingIndex === index ? (
                                // Display an input field for editing
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        editTask(index, e.target.text.value);
                                    }}
                                >
                                    <input
                                        type="text"
                                        name="text"
                                        defaultValue={task.text}
                                        autoFocus
                                        className="task-edit-input"
                                    />
                                    <button type="submit" className="save-button">Save</button>
                                </form>
                            ) : (
                                <>
                                    {task.text}
                                    <button
                                        className="edit-button" 
                                        onClick={() => setEditingIndex(index)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={(e) => deleteTask(index, e)}
                                    >
                                        Delete
                                    </button>
                                </>
                            )}

                        </li>
                    ))}
                </ul>
                <form onSubmit={handleTaskSubmit}>
                    <input
                        type="text"
                        placeholder="Add a task"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}

export default TodoList;
