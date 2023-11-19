import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/Taskform';
import './App.css'
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [id, setId] = useState(0);

  // Cargar las tareas desde el localStorage al cargar la página
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
    setId(storedTasks.length); // Asignar el último ID almacenado
  }, []);

  // Función para guardar las tareas en el localStorage
  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const addTask = (name) => {
    const updatedTasks = [...tasks, { id: id + 1, name: name, completed: false }];
    setTasks(updatedTasks);
    setId(id + 1);
    saveTasksToLocalStorage(updatedTasks);
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    saveTasksToLocalStorage(filteredTasks);
  };

  const editTask = (id, newName) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  return (
    <div className="app">
      <TaskForm onSubmit={addTask} />
      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  );
};

export default App;