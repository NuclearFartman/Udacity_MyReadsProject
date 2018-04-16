import React, { Component } from 'react'

class Shelf extends Component {

  setOptions = (book) => {
    if (book.hasOwnProperty('shelf')) {
      return book.shelf
    }
    else {
      return "none"
    }
  }


  render() {

    const { books, onSelectionChange, shelfName, shelfHeader } = this.props;

    const showingBooks = books.filter((b) => (
      b.shelf === shelfName
    ))

    return (

      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfHeader}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {showingBooks.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail.toString()})` }}></div>
                    <div className="book-shelf-changer">
                      <select
                        onChange={(event) => onSelectionChange(book, event.target.value)}
                        value={this.setOptions(book)}
                      >
                        <option value="header" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors[0]}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}



export default Shelf