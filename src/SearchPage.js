import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

class SearchPage extends Component {
  state = {
    query: "",
    searchedBooks: []
  };

  updateQuery = query => {
    this.setState({
      query: query
    });
    this.updateSearchedBooks(query);
  };

  updateSearchedBooks = query => {
    if (query) {
      // if we have right search fetch book
      BooksAPI.search(query).then(searchedBooks => {
        // if it's error be sure that is still array
        if (searchedBooks.error) {
          this.setState({ searchedBooks: [] });
          // if it's all right
        } else {
          this.setState({ searchedBooks: searchedBooks });
        }
      });
    } else {
      // if we don't have data for searched book display none (empty array)
      this.setState({ searchedBooks: [] });
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              // update query depends on user input
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {/* display searched term */}
            {this.state.searchedBooks.map(searchedBook => {
              let shelf = "none";

              this.props.books.map(
                book =>
                  book.id === searchedBook.id ? (shelf = book.shelf) : ""
              );
              return (
                <li key={searchedBook.id}>
                  <Book
                    book={searchedBook}
                    moveShelf={this.props.moveShelf}
                    currentShelf={shelf}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
