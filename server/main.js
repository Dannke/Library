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

Meteor.startup(async () => {
  if (BooksCollection.find().count() === 0) {
    insertBook({
      title: "asd",
      author: "John Doe",
      year: 2023,
      place: "Unknown",
      edition: "1st Edition",
      udc: "123.456",
    });
  }

  Meteor.publish('books', function () {
    return BooksCollection.find();
  });
});
