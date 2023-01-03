import "./App.css";
import React, { useState, useEffect, useRef } from "react";

function App() {
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userListLoading, setUserListLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const fetchUserList = async () => {
    setUserListLoading(true);
    await fetch("http://localhost:8080/api/v1/users", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((userList) => userList.json())
      .then((response) => {
        setUserList(response);
      });
    setUserListLoading(false);
  };

  const addUser = async (newUser) => {
    await fetch("http://localhost:8080/api/v1/create-user", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
  };

  const updateUser = async (user) => {
    await fetch("http://localhost:8080/api/v1/update-user", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  const deleteUser = async (id) => {
    await fetch("http://localhost:8080/api/v1/delete-user?id=" + id, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(user),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const newUser = { firstName, lastName, email };
    addUser(newUser);
    window.alert("New User Added!");
    window.location.reload();
  };

  function updateUserHandler(user) {
    updateUser(user);
    window.alert("User Updated!");
    window.location.reload();
  }

  function deleteUserHandler(id) {
    deleteUser(id);
    window.alert("User Deleted!");
    window.location.reload();
  }

  useEffect(() => {
    fetchUserList();
  }, []);
  let count = 1;
  return (
    <>
      <div class="columns" style={{ paddingLeft: "20px" }}>
        <div class="column">
          <h1>Create User</h1>
          <form id="create-user-form" onSubmit={handleSubmit}>
            <label for="first-name">First Name:</label>
            <br></br>
            <input type="text" id="first-name" name="first-name"></input>
            <br></br>
            {/* <input type="text" id="first-name" name="first-name"> */}
            <label for="last-name">Last Name:</label>
            <br></br>
            <input type="text" id="last-name" name="last-name"></input>
            <br></br>
            <label for="email">Email:</label>
            <br></br>
            <input type="text" id="email" name="email"></input>
            <br></br>
            <input type="submit" value="Submit"></input>
          </form>
        </div>
        <div class="column">
          <h1>Users</h1>
          <table id="users-table" style={{ border: "1px solid black" }}>
            <tr style={{ padding: "20px", border: "1px solid black" }}>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
            <tbody style={{ border: "1px solid black" }}>
              {userList.map((user) => {
                const currentCount = count;
                count += 1;
                return (
                  <tr key={user.id}>
                    <td style={{ border: "1px solid black" }}>
                      {currentCount}
                    </td>
                    <td
                      style={{ border: "1px solid black" }}
                      contenteditable="true"
                      onInput={(event) => {
                        const updatedUser = {
                          ...user,
                          firstName: event.target.innerText,
                        };
                        setCurrentUser(updatedUser);
                      }}
                    >
                      {user.firstName}
                    </td>
                    <td
                      style={{ border: "1px solid black" }}
                      contenteditable="true"
                      onInput={(event) => {
                        const updatedUser = {
                          ...user,
                          lastName: event.target.innerText,
                        };
                        setCurrentUser(updatedUser);
                      }}
                    >
                      {user.lastName}
                    </td>
                    <td
                      style={{ border: "1px solid black" }}
                      contenteditable="true"
                      onInput={(event) => {
                        const updatedUser = {
                          ...user,
                          email: event.target.innerText,
                        };
                        setCurrentUser(updatedUser);
                      }}
                    >
                      {user.email}
                    </td>
                    <td>
                      <button onClick={() => updateUserHandler(currentUser)}>
                        Update
                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteUserHandler(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
