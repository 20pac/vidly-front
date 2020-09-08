import React from "react";

export default function List(props) {
  let genres = [{ _id: 1, name: "All" }, ...props.itemList];
  return (
    <ul className="list-group">
      {genres.map((item) => (
        <li
          className={
            props.currentGenre === item.name
              ? "list-group-item clickable active"
              : "list-group-item clickable"
          }
          onClick={() => props.handleGenreChange(item)}
          key={item._id}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
