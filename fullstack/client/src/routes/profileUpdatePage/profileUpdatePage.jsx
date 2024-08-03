import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget.jsx";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";
import "./profileUpdatePage.scss";


function ProfileUpdatePage() {

  const { currentUser, updateUser } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(currentUser.avatar);



  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); //doesn't refresh the page
    const formData = new FormData(e.target); // to be able to use the form data

    const { username, email, password } = Object.fromEntries(formData); // to access    //in login we used fromdata too

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar,
      });

      updateUser(res.data)////////////////////////////////////////////////////////////////////////////////////////////////
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              defaultValue={currentUser.email}
              type="email"
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>Error</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar || "/noavatar.jpg"}
          alt=""
          className="avatar"
        />
        <UploadWidget 
        uwConfig={{
          cloudName:"devhivesite",  // from https://console.cloudinary.com/ the cloud name i made
          uploadPreset:"Devhive",
          multiple: false,          // only one file
          maxImageFileSize: 1024 * 1024 * 15,  //max size
          folder:"avatars",        // folder where the image will be stored
          
          }}
          setAvatar={setAvatar}
          
          />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
