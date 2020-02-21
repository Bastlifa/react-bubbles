import React, {useState} from "react";
import axios from 'axios'
const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [creds, setCreds] = useState({ username: '', password: '' })

  const handleChange = event =>
  {
    setCreds({ ...creds, [event.target.name]: event.target.value })
  }

  const handleSubmit = event =>
  {
    event.preventDefault()
    axios
      .post(`http://localhost:5000/api/login`, creds)
      .then(res =>
        {
          console.log("res from login", res)
          localStorage.setItem("token", res.data.payload)
          props.history.push('/bubble-page')
        })
      .catch(err =>
        {
          console.log("err from login", err)
        })
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name={'username'} 
          placeholder='Username' 
          value={creds.username} 
          onChange={handleChange} 
        />
        <input 
          type="password" 
          name={'password'} 
          placeholder='Password' 
          value={creds.password} 
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
