import React from "react";
import { Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import MainPage from "./MainPage";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  // fetch books using BooksAPI.js
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }

  // Manipulation with book shelf
  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      // set shelf for new or updated book
      book.shelf = shelf;

      // get list of books without updated or new book
      var updatedBooks = this.state.books.filter(b => b.id !== book.id);

      // add book to array and set new state
      updatedBooks.push(book);
      this.setState({ books: updatedBooks });
    });
  };

  render() {
    return (
      <div className="app">
        {/* add route to application */}
        <Route
          exact
          path="/"
          render={() => (
            <MainPage books={this.state.books} moveShelf={this.moveShelf} />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage books={this.state.books} moveShelf={this.moveShelf} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
