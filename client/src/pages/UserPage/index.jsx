import UserForm from '../../components/forms/UserForm';
import UsersList from '../../components/UsersList';

function UserPage () {
  return (
    <section>
      <h2>User Page</h2>
      <UserForm />
      <UsersList />
    </section>
  );
}

export default UserPage;
