import { useState } from "react";
import PropTypes from 'prop-types';

const TaskItem = ({ task, onDelete, onToggle }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleCompleted = () => {
    onToggle(task.id);
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    onDelete(task.id);
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div className={`card ${task.completed ? "completed" : ""}`}>
      <div className="card-content">
        <span>{task.name}</span>
        <div className="button-group">
          <button className={task.completed ? "uncomplete-btn" : "complete-btn"} onClick={toggleCompleted}>
            {task.completed ? "Desmarcar" : "Completar"}
          </button>
          <button className="delete-btn" onClick={handleDelete}>Eliminar</button>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <p>¿Estás seguro que deseas eliminar?</p>
          <button className="btn-confdelete" onClick={confirmDelete}>Sí</button>
          <button className="btn-cancdelete" onClick={cancelDelete}>No</button>
        </div>
      )}
      {task.completed ? (
        <span className="visual-completed">&#10003;</span>
      ) : (
        <span className="visual-pending">&#10063;</span>
      )}
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TaskItem;

