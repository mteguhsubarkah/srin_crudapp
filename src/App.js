import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
    <div class="columns" style={{paddingLeft: '20px'}}>
  <div class="column">
    <h1>Create User</h1>
    <form id="create-user-form">
      <label for="first-name">First Name:</label><br></br>
      <input type="text" id="first-name" name="first-name" ></input><br></br>
      {/* <input type="text" id="first-name" name="first-name"> */}
      <label for="last-name">Last Name:</label><br></br>
      <input type="text" id="last-name" name="last-name"></input><br></br>
      <label for="email">Email:</label><br></br>
      <input type="text" id="email" name="email"></input><br></br>
      <input type="submit" value="Submit"></input>
    </form> 
  </div>
  <div class="column">
    <h1>Users</h1>
    <table id="users-table" style={{borderColor:'black'}}>
      <tr style={{padding: '20px', border: 'black'}}>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </table>
  </div>
</div>
    </>
    
  );
}

export default App;
