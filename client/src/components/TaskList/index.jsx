import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import {
  getTasksThunk,
  removeTaskThunk,
  updateTaskThunk,
} from './../../store/slices/taskSlice';
import styles from './TaskList.module.sass';
import { getUsersThunk } from '../../store/slices/usersSlice';
const TaskList = ({
  tasks,
  isFetching,
  error,
  getTasks,
  updateTask,
  removeTask,
  filter,
  getUsers,
  usersData: { users },
}) => {
  useEffect(() => {
    getTasks();
    getUsers();
  }, [getTasks, getUsers]);

  const handleCheckboxChange = (id, isDone) => {
    updateTask({ taskId: id, payload: { isDone: !isDone } });
  };

  const filteredTask =
    filter === null ? tasks : tasks.filter(t => t.isDone === filter);

  return (
    <>
      {isFetching && (
        <div className={styles.loader}>
          <BeatLoader loading={isFetching} />
        </div>
      )}
      {error && <div className={styles.error}>!!!ERROR!!!</div>}
      <ul className={styles.taskList}>
        {filteredTask.map(task => {
          const user = users.find(user => user.id === task.userId);

          return (
            <li key={task.id} className={styles.taskItem}>
              <input
                className={styles.checkbox}
                type='checkbox'
                checked={task.isDone}
                onChange={() => handleCheckboxChange(task.id, task.isDone)}
              />
              {task.body} {task.deadline}, {'Executor: '}
              {user ? user.nickname : 'Unknown User'}
              <button
                className={styles.deleteButton}
                onClick={() => removeTask(task.id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const mapStateToProps = ({ tasksData, usersData }) => ({
  tasks: tasksData.tasks,
  isFetching: tasksData.isFetching,
  error: tasksData.error,
  usersData: usersData,
});

const mapDispatchToProps = dispatch => ({
  getTasks: () => dispatch(getTasksThunk()),
  updateTask: ({ taskId, payload }) =>
    dispatch(updateTaskThunk({ taskId, payload })),
  removeTask: id => dispatch(removeTaskThunk(id)),
  getUsers: () => dispatch(getUsersThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
