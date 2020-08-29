import React, { Component } from "react";

export default class Paginator extends Component {
  render() {
    return this.renderButtons();
  }
  renderButtons() {
    console.log(this.props.currentPage);
    let { numberOfItems, pageSize, onPageChange } = this.props;
    let numberOfPages = Math.ceil(numberOfItems / pageSize);
    if (numberOfPages === 1) return null;
    let arrButtons = [];
    for (let i = 1; i <= numberOfPages; i++) {
      arrButtons.push(
        <li
          key={i}
          className={
            i === this.props.currentPage ? "page-item active" : "page-item"
          }
        >
          <button onClick={() => onPageChange(i)} className="page-link">
            {i}
          </button>
        </li>
      );
    }
    return (
      <nav>
        <ul className="pagination pagination-lg">{arrButtons}</ul>
      </nav>
    );
  }
}
