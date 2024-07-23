import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
function Login() {


  const [error, setError] = useState("");

  const [IsLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    const formData = new FormData(event.target); // to be able to use the form data

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    //console.log(username,email,password) testing

    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", {
        username,
        email,
        password,
      });

      //testing        console.log(res.data);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false)
    }
  };


// button disabbled till the page load
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" required minLength={3} maxLength={20} type="text" placeholder="Username" />
          <input name="password" type="password" required minLength={8}  placeholder="Password" />
          <button disabled={IsLoading}>Login</button>    
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
