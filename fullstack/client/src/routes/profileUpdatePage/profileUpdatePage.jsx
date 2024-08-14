import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./profileUpdatePage.scss";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();  //doesn't refresh the page
    const formData = new FormData(e.target); 

    const { username, email, password } = Object.fromEntries(formData); // to be able to use the form data

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar:avatar[0]  // 0 is like first item
      });
      updateUser(res.data);
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
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} /*if there is no avatar it will show the current avatar  and if it dont exsist show no avatar*/ alt="" className="avatar" />  
        <UploadWidget
          uwConfig={{
            cloudName: "devhivesite", /*from https://console.cloudinary.com/ the cloud name i made */
            uploadPreset: "Devhive",
            multiple: false,  /** only one file */
            maxImageFileSize: 2000000,
            folder: "avatars", /**folder where the image will be stored */
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;

