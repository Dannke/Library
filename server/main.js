// server/main.js
import { Meteor } from "meteor/meteor";
import { BooksCollection } from "/imports/api/booksCollection";
import { ReadersCollection } from "../imports/api/readersCollection";
import { check } from "meteor/check";
import { CountryCollection } from "../imports/api/countryCollection";
import { EditionsCollection } from "../imports/api/editionsCollection";
import { UdcCollection } from "../imports/api/udcCollection";

function insertBook(bookData) {
  // Проверяем, что bookData соответствует схеме BooksCollection
  check(bookData, {
    title: String,
    author: String,
    year: Number,
    country: String,
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
  Meteor.publish("books", function () {
    return BooksCollection.find();
  });

  Meteor.publish("editions", function () {
    const editions = EditionsCollection.find();
    return editions;
  });

  Meteor.publish("udc", function () {
    const udc = UdcCollection.find();
    return udc;
  });

  Meteor.publish("countries", function () {
    const countries = CountryCollection.find();
    return countries;
  });

  Meteor.methods({
    addBook: function (bookData) {
      bookData.year = parseInt(bookData.year, 10);
      insertBook(bookData);
    },
    deleteBook: function (bookTitle) {
      deleteBook(bookTitle);
    },
  });
});
