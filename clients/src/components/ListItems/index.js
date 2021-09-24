import React from "react";

export default function ListItems(props) {
  const { title, company, type, location } = props.items;

  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold text-primary">{company}</div>
            <span className="text-muted">
              {title} - <span className="text-success">{type}</span>
            </span>
          </div>
          <span className="text-black">{location}</span>
        </li>
      </ul>
    </div>
  );
}
