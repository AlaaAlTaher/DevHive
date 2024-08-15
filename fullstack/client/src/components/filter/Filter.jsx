import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./filter.scss";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
    //console.log(searchParams.get("Name")); //Name test
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    Name: searchParams.get("Name") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    Duration: searchParams.get("Duration") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("Name")}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="Name">Location</label>
          <input
            type="text"
            id="Name"
            name="Name"
            placeholder="Name Location"
            onChange={handleChange}
            defaultValue={query.Name} // maybe here the defined problem
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type" 
            onChange={handleChange}
            defaultValue={query.type}
          >
            <option value="">any</option>
            <option value="Freelance">Freelance</option>
            <option value="BugHunting">BugHunting</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select
            name="property"
            id="property"
            onChange={handleChange}
            defaultValue={query.property}
          >
            <option value="">any</option>
            <option value="website">website</option>
            <option value="mobile">mobile</option>
            <option value="game">game</option>
            <option value="other">other</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="Duration">Duration</label>
          <input
            type="text"
            id="Duration"
            name="Duration"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.Duration}
          />
        </div>
        <button onClick={handleFilter}>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
