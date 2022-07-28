import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar";
import "./index.css";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Users from "../../components/SearchResult";
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import makeAPICall from "../../utils/apiUtils";

let PageSize = 50;

export default function Search() {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState();

  const handleSubmit = () => {
    setLoading(true);
    let q1 = "+type:";
    q1 = q1.replace(/\+/g, "%20");
    q1 = decodeURIComponent(q1);
    const q = `${search}${q1}${searchType}`;
    const params = {
      q: searchType === "users" ? search : q,
      per_page: PageSize,
      page: 1,
    };
    return makeAPICall({
      method: "GET",
      params,
    })
      .then((res) => {
        // console.log(res)
        navigate(`search/${search}`);
        setUsers(res);
        setCurrentPage(1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (currentPage === undefined) {
      setUsers();
    } else {
      async function fetchData() {
        setLoading(true);
        let q1 = "+type:";
        q1 = q1.replace(/\+/g, "%20");
        q1 = decodeURIComponent(q1);
        const q = `${search}${q1}${searchType}`;

        const params = {
          q: searchType === "users" ? search : q,
          per_page: PageSize,
          page: 1,
        };

        return makeAPICall({
          method: "GET",
          params,
        })
          .then((res) => {
            setUsers(res);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
        // ...
      }
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

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
          <p className="radio-text">Search For</p>
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

              <Users users={users.items} />
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={users?.total_count}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
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
