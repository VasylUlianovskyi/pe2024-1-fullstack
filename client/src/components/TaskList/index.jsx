import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import {
  getTasksThunk,
  removeTaskThunk,
  updateTaskThunk,
} from './../../store/slices/taskSlice';

const TaskList = ({
  tasks,
  isFetching,
  error,
  getTasks,
  updateTask,
  removeTask,
  setFilter,
}) => {
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const handleCheckboxChange = (id, isDone) => {
    updateTask(id, { isDone: !isDone });
  };

  return (
    <>
      <BeatLoader loading={isFetching} />
      {error && <div>!!!ERROR!!!</div>}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type='checkbox'
              checked={task.isDone}
              onChange={() => handleCheckboxChange(task.id, task.isDone)}
            />
            {task.body} - {task.deadline}
            <button onClick={() => removeTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = ({ tasksData }) => ({
  tasks: tasksData.tasks,
  isFetching: tasksData.isFetching,
  error: tasksData.error,
});

const mapDispatchToProps = dispatch => ({
  getTasks: () => dispatch(getTasksThunk()),
  updateTask: (id, data) => dispatch(updateTaskThunk({ id, data })),
  removeTask: id => dispatch(removeTaskThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
