import React, { useState } from "react";
import NavBar from "../../components/Navbar";
import "./index.css";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Users from "../../components/SearchResult";
import makeAPICall from "../../utils/apiUtils";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    let params;
    const q1 = "+type:";
    let q = `${search}${q1}${searchType}`;
    // q = encodeURIComponent(q);
    console.log(q, "hfhf");
    params = {
      q: searchType === "users" ? search : q,
      per_page: 50,
      page: 1,
    };
    return makeAPICall({
      method: "GET",
      params,
    })
      .then((res) => {
        console.log(res);
        navigate(`search/${search}`);
        setUsers(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div>
      <NavBar />
      <section className="search-header">
        <div className="user-type">
          <InputField
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Enter Search Keyword"
          />
          <p>Search For</p>
          <div className="user-type-input">
            <div>
              <label>
                <input
                  type="radio"
                  checked={searchType === "users"}
                  onChange={() => setSearchType("users")}
                />
                <span>User</span>
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  checked={searchType === "org"}
                  onChange={() => setSearchType("org")}
                />
                <span>Organization</span>
              </label>
            </div>
          </div>
          <br />
          <Button
            onClick={handleSubmit}
            type="button"
            disabled={!(search && searchType)}
          >
            Search
          </Button>
        </div>
      </section>
      {loading ? (
        <div className="spinner">
          <h1>Loading...</h1>
        </div>
      ) : (
        <React.Fragment>
          {users && users?.items.length > 0 ? (
            <div>
              <div className="users-list">
                <p className="no-result">
                  Found {users?.total_count} results for {search}
                </p>
              </div>

              <Users users={users?.items} />
            </div>
          ) : users && !users?.items.length ? (
            <div className="users-list">
              <p className="no-result">
                😬 No results found for {search}, please search again
              </p>
            </div>
          ) : null}
        </React.Fragment>
      )}
    </div>
  );
}
