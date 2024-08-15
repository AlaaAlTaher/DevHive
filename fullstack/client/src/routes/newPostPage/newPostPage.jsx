import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import apiRequest from "../../lib/apiRequest";
import "./newPostPage.scss";

function NewPostPage() {
  const [value, setValue] = useState(""); // 2,34
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {      // send the form
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          website: inputs.website,
          Name: inputs.Name,
          Duration: parseInt(inputs.Duration),
          Members: parseInt(inputs.Members),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: { 
          desc: value, // its in the usestate from the editor
          tools: inputs.tools,
          AI: inputs.AI,
          Notes: inputs.Notes,
          difficulty: parseInt(inputs.difficulty),

        },
      });
      navigate("/"+res.data.id) // post id too
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="Name">Name</label>
              <input id="Name" name="Name" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="website">website</label>
              <input id="website" name="website" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="Duration">Duration</label>
              <input min={1} id="Duration" name="Duration" type="number" />
            </div>
            <div className="item">
              <label htmlFor="Members">Members Number</label>
              <input min={1} id="Members" name="Members" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="BugHunting" defaultChecked>
                  BugHunting
                </option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="website">website</option>
                <option value="mobile">mobile</option>
                <option value="game">game</option>
                <option value="other">other</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="tools">tools Policy</label>
              <select name="tools">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="AI">AI Policy</label>
              <select name="AI">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="Notes">Notes</label>
              <input
                id="Notes"
                name="Notes"
                type="text"
                placeholder="Notes"
              />
            </div>
            <div className="item">
              <label htmlFor="difficulty"> difficulty </label>
              <input min={0}  id="difficulty" name="difficulty" type="number" max={10} />
            </div>
          
            <button className="sendButton">Add</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true, // for multi emage
            cloudName: "devhivesite", 
            uploadPreset: "Devhive", // maxImgeFileSize: 10000000,
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;


//  npm i react-quill     in the client