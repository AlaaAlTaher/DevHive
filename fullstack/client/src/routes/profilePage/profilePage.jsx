import { Suspense, useContext } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
function ProfilePage() {
  const { updateUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const data = useLoaderData();
  /*   useEffect(() => {
    if (!currentUser) {
      //if there is no user redirect to login

      navigate("/login");
    }
  }, [currentUser, navigate]); */ // it was replaced by layout

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      //localStorage.removeItem("user")
      updateUser(null); // instead of line above

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "noavatar.jpg"} //https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div> {/* trying to delete the suspence to fix the error 3:48 */}
          <Suspense fallback={<p>Loading...</p>}>  {/* Trying to add like loading screen function, if worked ill keep it it seems fun and intresting to learn */}
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
            </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>  {/* Trying to add like loading screen function, if worked ill keep it it seems fun and intresting to learn */}
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
            </Suspense>   
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
