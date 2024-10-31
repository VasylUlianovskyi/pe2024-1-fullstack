import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TaskForm from './../../components/forms/TaskForm';
import TaskList from './../../components/TaskList';
import { getTasksThunk } from './../../store/slices/taskSlice';
import styles from './TaskPage.module.sass';

const TaskPage = ({ getTasks, tasks }) => {
  const [filter, setFilter] = useState(null);
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const handleTaskAdded = () => {
    getTasks();
    setFilter(null);
  };

  return (
    <div className={styles.taskPage}>
      <h1>Task Page</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <div className={styles.taskList}>
        <TaskList tasks={tasks} filter={filter} />
      </div>
      <button onClick={() => setFilter(null)}>Show all tasks</button>
      <button onClick={() => setFilter(true)}>Show done tasks</button>
      <button onClick={() => setFilter(false)}>Show not done tasks</button>
    </div>
  );
};

const mapStateToProps = ({ tasksData }) => ({
  tasks: tasksData.tasks,
  isFetching: tasksData.isFetching,
  error: tasksData.error,
});

const mapDispatchToProps = dispatch => ({
  getTasks: () => dispatch(getTasksThunk()),
  setFilter: filter => dispatch(setFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);
