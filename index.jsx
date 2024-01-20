// Install axios using: npm install axios
import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        // Save user details in local storage
        localStorage.setItem("user", JSON.stringify(response.data));
        setLoggedInUser(response.data); // Set the logged-in user state
      } else {
        setError(response.data.error); // Display the error from the API
      }
    } catch (error) {
      setError("An error occurred during login."); // Generic error message
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

const Profile = ({ loggedInUser }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/users/${loggedInUser.id}`
        );
        setUserDetails(response.data);
        // Save user details in local storage
        localStorage.setItem("userDetails", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (loggedInUser) {
      fetchUserDetails();
    }
  }, [loggedInUser]);

  return (
    <div>
      <h1>Profile</h1>
      {userDetails && (
        <div>
          <p>Username: {userDetails.username}</p>
          <p>Email: {userDetails.email}</p>
          {/* Display other user details as needed */}
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div>
      {!loggedInUser ? (
        <Login setLoggedInUser={setLoggedInUser} />
      ) : (
        <Profile loggedInUser={loggedInUser} />
      )}
    </div>
  );
};

export default App;
