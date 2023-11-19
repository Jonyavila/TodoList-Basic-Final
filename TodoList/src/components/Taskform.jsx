import PropTypes from 'prop-types'
const TaskForm = ({ onSubmit }) => {
let input;

return (
    <form className='todo-form' onSubmit={(e) => {
      e.preventDefault();
      if (!input.value.trim()) {
        return;
      }
      onSubmit(input.value);
      input.value = '';
      input.focus();
    }}>
      <input ref={(node) => input = node} placeholder="¿Cuál es la tarea hoy?" />
      <button type="submit">Agregar</button>
    </form>
);
};
TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
export default TaskForm