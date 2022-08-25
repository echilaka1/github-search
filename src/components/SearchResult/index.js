import React from "react";
import "./result.css";

export default function Users({ users }) {
  // console.log(users);

  const fetchDataAsync = async (url) => {
    let obj = await (
      await fetch("https://api.github.com/users/echilaka1/followers")
    ).json();
    console.log(obj.length);

  Promise.all(obj).then((responses) => {
    console.log(responses);
  });
  };

  fetchDataAsync();

  return (
    <div className="users-list">
      <div className="container">
        {users.map((user, index) => (
          <div className="box" key={index}>
            <div className="box-content">
              <img src={user.avatar_url} alt={user.login} />

              <div className="box-flex">
                <h1 className="details">
                  {user.login.substring(0, 5) + "..."}{" "}
                  <a href={user.html_url}>
                    <span>@{user.login}</span>
                  </a>
                </h1>
                <div className="followers">
                  <div>
                    <h2>Followers</h2>
                    <p>{user?.followers_url.length}</p>
                  </div>
                  <div>
                    <h2>Following</h2>
                    <p>{user.following_url.length - 13}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
