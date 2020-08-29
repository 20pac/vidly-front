import React, { Component } from "react";
import Like from "./common/Like";
import Paginator from "./common/Paginator";
import { getMovies } from "../services/fakeMovieService";
import Paginate from "../utils/Paginate";

export default class Movies extends Component {
  state = {
    movies: getMovies().map((movie) => {
      let newMovie = { ...movie, liked: false };
      return newMovie;
    }),
    pageSize: 4,
    currentPage: 1,
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
    const movies = Paginate(
      this.state.movies,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <>
        <p className="mt-4">
          Currently, there are{" "}
          <span className="text-success">{this.state.movies.length}</span>{" "}
          movies in stock.
        </p>
        <Paginator
          numberOfItems={this.state.movies.length}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
          currentPage={this.state.currentPage}
        />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => {
              return (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      onClick={() => this.toggleLike(movie)}
                      liked={movie.liked}
                    />
                  </td>
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
  toggleLike = (movie) => {
    let movies = [...this.state.movies];
    let index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
}
