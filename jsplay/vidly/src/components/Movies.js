import React, { Component } from "react";
import MoviesTable from "./MoviesTable";
import Paginator from "./common/Paginator";
import List from "./common/List";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Paginate from "../utils/Paginate";
import _ from "lodash";

export default class Movies extends Component {
  state = {
    movies: getMovies().map((movie) => {
      let newMovie = { ...movie, liked: false };
      return newMovie;
    }),
    pageSize: 4,
    currentPage: 1,
    genres: getGenres(),
    currentGenre: "All",
    sortColumn: { path: "title", order: "asc" },
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

    let allMovies =
      this.state.currentGenre === "All"
        ? this.state.movies
        : this.state.movies.filter(
            (movie) => movie.genre.name === this.state.currentGenre
          );
    let sorted = _.orderBy(
      allMovies,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    let movies = Paginate(sorted, this.state.currentPage, this.state.pageSize);
    return (
      <div className="row mt-4">
        <div className="col-md-3">
          <List
            itemList={this.state.genres}
            handleGenreChange={this.handleGenreChange}
            currentGenre={this.state.currentGenre}
          />
        </div>
        <div className="col-md-9">
          <p>
            Showing <span className="text-success">{allMovies.length}</span>{" "}
            movies in database.
          </p>
          <Paginator
            numberOfItems={allMovies.length}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
          <MoviesTable
            movies={movies}
            toggleLike={this.toggleLike}
            deleteMovie={this.deleteMovie}
            onSort={this.onSort}
            sortColumn={this.state.sortColumn}
          />
        </div>
      </div>
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
  handleGenreChange = (item) => {
    this.setState({ currentGenre: item.name, currentPage: 1 });
  };
  onSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
}
