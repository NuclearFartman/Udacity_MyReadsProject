import React, { Component } from 'react'

class SearchPage extends Component {

  state = {
    s_query: ''
  }

  updateQuery = (u_query) => {
    this.setState(() => ({
      s_query: u_query
    }))
    this.props.search(u_query)
  }

  setOptions = (book) => {
    let bookAlreadyOnShelf = this.props.books.find((b) => b.id === book.id)
    if (bookAlreadyOnShelf) {
      return bookAlreadyOnShelf.shelf
    }
    else {
      return 'none'
    }
  }

  //get address of bookCover or alternatively get fallback image address
  getBookCoverAddress = (book) => {
    if (book.imageLinks !== undefined) {
      return book.imageLinks.thumbnail
    }
    else {
      return './favicon.ico'
    }
  }

  render() {
    const { onSelectionChange, searchedBooks } = this.props
    const { s_query } = this.state
    const showingBooks = s_query === ''
      ? [] //empty query shows no books
      : searchedBooks

    return (
      <div>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={s_query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map((book) => (
              <li key={book.id} >
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.getBookCoverAddress(book)})` }}></div>
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
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

    )
  }

}

export default SearchPage