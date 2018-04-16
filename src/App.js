import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage';
import Shelf from './Shelf';
import { Link, Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: []
  }


  componentDidMount() {
    BooksAPI.getAll()
      .then((result) => {
        this.setState(() => ({
          books: result
        }))
      })
  }

  search = (query) => {
    BooksAPI.search(query)//if query is a string not at least partially defined in SEARCH_TERMS.md in the project then this method returns shit
      .then((result) => {
        if (result !== undefined && !result.hasOwnProperty("error")) {
          this.setState(() => ({
            searchedBooks: result
          }))
        }
        else {
          this.setState(() => ({
            searchedBooks: []
          }))
        }

      })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        BooksAPI.getAll()
        .then((result) => {
          this.setState(() => ({
            books: result
          }))
          result.map((book) => {
          })
        })
      })
  }

  delayer = () => {

  }

  promiseTester = () => {

  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link
                to='/'
                className="close-search"
              >Close</Link>
              <SearchPage
                onSelectionChange={this.updateShelf}
                search={this.search}
                searchedBooks={this.state.searchedBooks}
                books={this.state.books}
              />
            </div>
          </div>
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Shelf
                books={this.state.books}
                onSelectionChange={this.updateShelf}
                shelfName="currentlyReading"
                shelfHeader="Currently Reading"
              />
              <Shelf
                books={this.state.books}
                onSelectionChange={this.updateShelf}
                shelfName="wantToRead"
                shelfHeader="Want to Read"
              />
              <Shelf
                books={this.state.books}
                onSelectionChange={this.updateShelf}
                shelfName="read"
                shelfHeader="Read"
              />
            </div>
            <div className="open-search">
              <Link
                to="/search"
              >Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
