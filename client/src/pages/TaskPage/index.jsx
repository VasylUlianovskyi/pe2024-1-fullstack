import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TaskForm from './../../components/forms/TaskForm';
import TaskList from './../../components/TaskList';
import { getTasksThunk } from './../../store/slices/taskSlice';

const TaskPage = ({ getTasks, tasks }) => {
  const [filter, setFilter] = useState(null);
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <div>
      <h1>Сторінка тасок</h1>
      <TaskForm />
      <TaskList tasks={tasks} />
      <button onClick={() => setFilter(true)}>Показати виконані</button>
      <button onClick={() => setFilter(false)}>Показати невиконані</button>
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
