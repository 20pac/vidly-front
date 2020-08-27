import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

export default class Movies extends Component {
  state = {
    movies: getMovies(),
  };
  render() {
    if (this.state.movies.length === 0) {
      return (
        <>
          <p className="text-danger mt-4">
            There are no movies in stock right now....
          </p>
        </>
      );
    }
    return (
      <>
        <p className="mt-4">
          Currently, there are{" "}
          <span className="text-success">{this.state.movies.length}</span>{" "}
          movies in stock.
        </p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => {
              return (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteMovie(movie._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
  deleteMovie = (id) => {
    let movies = [...this.state.movies.filter((movie) => movie._id !== id)];
    this.setState({ movies: movies });
  };
}
