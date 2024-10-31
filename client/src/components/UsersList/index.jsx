import { useEffect } from 'react';
import { connect } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import styles from './UsersList.module.sass';
import defImage from './defaultPhoto.jpg';
import { getUsersThunk, removeUserThunk } from '../../store/slices/usersSlice';

import { Link, useParams } from 'react-router-dom';
import { getTasksThunk } from '../../store/slices/taskSlice';

export const UsersList = ({
  usersData: { users, isFetching, error },
  getUsers,
  removeUser,
  getTasks,
  tasksData: { tasks },
}) => {
  useEffect(() => {
    getUsers();
    getTasks();
  }, []);

  useParams();

  let { userId } = useParams();
  console.log(userId);

  return (
    <div className={styles.usersList}>
      <BeatLoader loading={isFetching} />
      {error && <div>!!!ERROR!!!</div>}
      <ul>
        {users.map(u => (
          <li key={u.id}>
            <img
              src={u.image ? `http://localhost:5000/${u.image}` : defImage}
              alt={u.nickname}
              className={styles.userImage}
            />
            <p>
              <Link to={`/users/${u.id}/tasks`}>
                {u.nickname} {u.email}
              </Link>
            </p>

            {u.id == userId &&
              tasks
                .filter(t => t.userId === u.id)
                .map(t => (
                  <li>
                    {t.body} {t.deadline}
                  </li>
                ))}
            <button onClick={() => removeUser(u.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ usersData, tasksData }) => ({
  usersData,
  tasksData,
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsersThunk()),
  removeUser: id => dispatch(removeUserThunk(id)),
  getTasks: id => dispatch(getTasksThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
