"use strict";

const Book = require("../models/Book");

const handleError = (error, message, next) => {
  console.log(`${message}: ${error.message}`);
  next(error);
};

module.exports = {
  index: (req, res, next) => {
    Book.find()
      .then((books) => {
        res.locals.books = books;
        next();
      })
      .catch((error) => handleError(error, "Error fetching books", next));
  },

  indexView: (req, res) => {
    res.render("books/index", {
      page: "books",
      title: "All Books",
    });
  },

  new: (req, res) => {
    res.render("books/new", {
      page: "new-book",
      title: "New Book",
    });
  },

  create: (req, res, next) => {
    let bookParams = {
      bookname: req.body.bookname,
      author: req.body.author,
      publisher: req.body.publisher,
      location: req.body.location,
    };

    Book.create(bookParams)
      .then((book) => {
        res.locals.redirect = "/books";
        res.locals.book = book;
        next();
      })
      .catch((error) => handleError(error, "Error saving book", next));
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let bookId = req.params.id;
    Book.findById(bookId)
      .then((book) => {
        res.locals.book = book;
        next();
      })
      .catch((error) => handleError(error, "Error fetching book by ID", next));
  },

  showView: (req, res) => {
    res.render("books/show", {
      page: "book-details",
      title: "Book Details",
    });
  },

  edit: (req, res, next) => {
    let bookId = req.params.id;
    Book.findById(bookId)
      .then((book) => {
        res.render("books/edit", {
          book: book,
          page: "edit-book",
          title: "Edit Book",
        });
      })
      .catch((error) => handleError(error, "Error fetching book by ID", next));
  },

  update: (req, res, next) => {
    let bookId = req.params.id,
      bookParams = {
        bookname: req.body.bookname,
        author: req.body.author,
        publisher: req.body.publisher,
        location: req.body.location,
      };

    Book.findByIdAndUpdate(bookId, {
      $set: bookParams,
    })
      .then((book) => {
        res.locals.redirect = `/books/${bookId}`;
        res.locals.book = book;
        next();
      })
      .catch((error) => handleError(error, "Error updating book by ID", next));
  },

  delete: (req, res, next) => {
    let bookId = req.params.id;
    Book.findByIdAndRemove(bookId)
      .then(() => {
        res.locals.redirect = "/books";
        next();
      })
      .catch((error) => handleError(error, "Error deleting book by ID", next));
  },
};