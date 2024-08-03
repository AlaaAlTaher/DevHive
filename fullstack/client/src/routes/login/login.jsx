
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import apiRequest from "../../lib/apiRequest.js";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./login.scss";
function Login() {


  const [error, setError] = useState("");

  const [IsLoading, setIsLoading] = useState(false);

  const {updateUser} = useContext(AuthContext);//////////////////////


  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    setError("")
    const formData = new FormData(event.target); // to be able to use the form data

    const username = formData.get("username");
    const password = formData.get("password");

    //console.log(username,email,password) testing

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      console.log(res) //this for testing
            //testing        console.log(res.data);
     // localStorage.setItem("user", JSON.stringify(res.data)) //sending the data
      updateUser(res.data) // this is instead of the one above it



      navigate("/");
      
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
          <input name="password" type="password"  placeholder="Password" />
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
