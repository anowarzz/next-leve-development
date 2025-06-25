import { useReducer } from "react";

function UseReducerExample() {
  const initialState = {
    name: "",
    email: "",
    phone: "",
  };

  // const action = {
  //   type: "FIELD_UPDATE",
  //   payload: {
  //     field: "name",
  //     value: "Programming Hero",
  //   },
  // };

  const reducer = (state, action) => {
    switch (action.type) {
      case "FIELD_UPDATE":
        return {
          ...state,
          [action.payload.field]: action.payload.value,
        };

      default:
        return state;
    }
  };

  const [userInfo, dispatch] = useReducer(reducer, initialState);

  const handleOnChange = (e) => {
    dispatch({
      type: "FIELD_UPDATE",
      payload: {
        field: e.target.name,
        value: e.target.value,
      },
    });
  };

  const handleSubmit = () => {
    console.log("Submitted User Info:", userInfo);
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
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={userInfo.email}
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={userInfo.phone}
          onChange={(e) => handleOnChange(e)}
        />
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default UseReducerExample;
