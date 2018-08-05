import React, { Component } from "react";

class Book extends Component {
  render() {
    let displayImage = this.props.book.imageLinks
      ? this.props.book.imageLinks.thumbnail
      : "";
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              // display image using API and read from console for imageLinks.thumbnail
              backgroundImage: `url("${displayImage}")`
            }}
          />
          <div className="book-shelf-changer">
            {/* move book on selected option */}
            <select
              onChange={event =>
                this.props.moveShelf(this.props.book, event.target.value)
              }
              value={this.props.currentShelf}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        {/* show book title and author */}
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors}</div>
      </div>
    );
  }
}

export default Book;
