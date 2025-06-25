import { useState } from "react";
import "./App.css";

function App() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const updateUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo);
  };

  return (
    <div>
      <div>
        <label htmlFor="name">Phone</label>
        <input
          type="text"
          id="name"
          name="name"
          value={userInfo.name}
          onChange={(e) => updateUserInfo(e)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={userInfo.email}
          onChange={(e) => updateUserInfo(e)}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={userInfo.phone}
          onChange={(e) => updateUserInfo(e)}
        />
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
