import React from "react";
import "./result.css";

export default function Users({users}) {
    console.log(users)
  return (
    <div className="users-list">
      <div className="container">
        <div className="box box_1">Box 1</div>
        <div className="box box_2">Box 2</div>
        <div className="box box_3">Box 3</div>
        <div className="box box_1">Box 1</div>
        <div className="box box_2">Box 2</div>
        <div className="box box_3">Box 3</div>
      </div>
    </div>
  );
}
