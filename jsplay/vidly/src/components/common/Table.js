import React, { Component } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
export default class Table extends Component {
  render() {
    return (
      <table className="table">
        <TableHeader
          columns={this.props.columns}
          sortColumn={this.props.sortColumn}
          onSort={this.props.onSort}
        />
        <TableBody data={this.props.data} columns={this.props.columns} />
      </table>
    );
  }
}
