import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import { AuthContext } from "../../context/AuthContext";
import "./homePage.scss";

function HomePage() {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">From Developers, To Developers</h1>
          <p>
            DevHive is Jordan premiere freelancing platform for developers. We connect talented developers with exciting projects, providing
            a space to showcase skills, collborate, and grow. Join us today to advance you freelancing career and be a part of Jordans 
            thriving tech community.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>#1</h1>
              <h2>Choice for developers</h2>
            </div>
            <div className="box">
              <h1>10K</h1>
              <h2>Freelancers</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Job Opportunities</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
