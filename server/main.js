// server/main.js
import { Meteor } from "meteor/meteor";
import { BooksCollection } from "/imports/api/booksCollection";
import { ReadersCollection } from "../imports/api/readersCollection";
import { check } from 'meteor/check';

function insertBook(bookData) {
  // Проверяем, что bookData соответствует схеме BooksCollection
  check(bookData, {
    title: String,
    author: String,
    year: Number,
    place: String,
    edition: String,
    udc: String,
  });

  return BooksCollection.insert(bookData);
}

function deleteBook(bookTitle) {
  check(bookTitle, String);
  return BooksCollection.remove({ title: bookTitle });
}

Meteor.startup(async () => {

  Meteor.publish('books', function () {
    return BooksCollection.find();
  });

  Meteor.methods({
    'addBook': function (bookData) {
      bookData.year = parseInt(bookData.year, 10);
      insertBook(bookData);
    },
    'deleteBook': function (bookTitle) {
      deleteBook(bookTitle);
    }
  });
});
