import React from "react";
import "./result.css";

export default function Users({ users }) {
//   console.log(users);
  return (
    <div className="users-list">
      <div className="container">
        {users.map((user, index) => (
          <div className="box" key={index}>
            <div className="box-content">
              <img src={user.avatar_url} alt={user.login} />
              <div className="details">
                <h3>{user.login} <a href={user.html_url}><span>@{user.login}</span></a></h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
