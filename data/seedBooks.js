// seedBooks.js

"use strict";

const mongoose = require("mongoose"),
  Book = require("../models/Book");

// 데이터베이스 연결 설정
mongoose.connect(
    "mongodb+srv://ut-node:ZCLz72q3RJMiD8GW@taeden.wxgncva.mongodb.net/?retryWrites=true&w=majority&appName=taeden,",
  );
  const db = mongoose.connection;
  db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
  });

mongoose.connection;
// 책 데이터 배열 정의
var books = [
  {
    bookname: "The Catcher in the Rye",
    author: "J.D. Salinger",
    publisher: "Little, Brown and Company",
    location: "New York",
  },
  {
    bookname: "To Kill a Mockingbird",
    author: "Harper Lee",
    publisher: "J.B. Lippincott & Co.",
    location: "Alabama",
  },
  {
    bookname: "1984",
    author: "George Orwell",
    publisher: "Secker & Warburg",
    location: "London",
  },
  {
    bookname: "Pride and Prejudice",
    author: "Jane Austen",
    publisher: "T. Egerton, Whitehall",
    location: "England",
  },
];

var commands = [];


Book.deleteMany({})
  .exec()
  .then((result) => {
    console.log(`Deleted ${result.deletedCount} book records!`);
  });

setTimeout(() => {
  // 프라미스 생성을 위한 구독자 객체 루프
  books.forEach((c) => {
    commands.push(
      Book.create({
        bookname: c.bookname,
        author: c.author,
        publisher: c.publisher,
        location: c.location,
      }).then((book) => {
        console.log(`Created book: ${book.bookname}`);
      })
    );
  });

  console.log(`${commands.length} commands created!`);

  Promise.all(commands)
    .then((r) => {
      console.log(JSON.stringify(r));
      mongoose.connection.close();
      console.log("Connection closed!");
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
}, 2000);
