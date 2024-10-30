import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import {
  getTasksThunk,
  removeTaskThunk,
  updateTaskThunk,
} from './../../store/slices/taskSlice';
import styles from './TaskList.module.sass';

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
    console.log(`Updating task with id: ${id}, new isDone: ${!isDone}`);
    updateTask({ taskId: id, payload: { isDone: !isDone } });
  };

  return (
    <>
      {isFetching && (
        <div className={styles.loader}>
          <BeatLoader loading={isFetching} />
        </div>
      )}
      {error && <div className={styles.error}>!!!ERROR!!!</div>}
      <ul className={styles.taskList}>
        {tasks.map(task => (
          <li key={task.id} className={styles.taskItem}>
            <input
              className={styles.checkbox}
              type='checkbox'
              checked={task.isDone}
              onChange={() => {
                handleCheckboxChange(task.id, task.isDone);
              }}
            />
            {task.body} {task.deadline}
            <button
              className={styles.deleteButton}
              onClick={() => {
                removeTask(task.id);
              }}
            >
              Delete
            </button>
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
  updateTask: ({ taskId, payload }) =>
    dispatch(updateTaskThunk({ taskId, payload })),
  removeTask: id => dispatch(removeTaskThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
