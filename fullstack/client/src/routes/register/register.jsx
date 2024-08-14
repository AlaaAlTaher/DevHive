import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import "./register.scss";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // to go to login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setIsLoading(true);
    const formData = new FormData(e.target); // to be able to use the form data

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    //console.log(username,email,password) testing
    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });
      //testing        console.log(res.data);
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }; //to access liberary:     npm i axios
  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
