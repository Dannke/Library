// server/main.js
import { Meteor } from "meteor/meteor";
import { BooksCollection } from "/imports/api/booksCollection";
import { ReadersCollection } from "../imports/api/readersCollection";
import { check } from "meteor/check";
import { CountryCollection } from "../imports/api/countryCollection";
import { EditionsCollection } from "../imports/api/editionsCollection";
import { UdcCollection } from "../imports/api/udcCollection";
import { inventoryNumbersCollection } from "../imports/api/inventoryNumbersCollection";

function insertBook(bookData) {
  // Проверяем, что bookData соответствует схеме BooksCollection
  check(bookData, {
    title: String,
    author: String,
    year: Number,
    country: String,
    edition: String,
    udc: String,
    count: Number,
  });

  return BooksCollection.insert(bookData);
}

function deleteBook(bookTitle) {
  check(bookTitle, String);
  return BooksCollection.remove({ title: bookTitle });
}

function generateBookNumber() {
  // Находим максимальный существующий номер
  const maxNumber = inventoryNumbersCollection.findOne(
    {},
    {
      sort: { number: -1 },
      fields: { number: 1 },
    }
  );
  return (maxNumber?.number || 0) + 1;
}

Meteor.startup(async () => {
  Meteor.publish("books", function () {
    return BooksCollection.find();
  });

  Meteor.publish("editions", function () {
    const editions = EditionsCollection.find();
    return editions;
  });

  Meteor.publish("inventory_numbers", function () {
    const invNumbers = inventoryNumbersCollection.find();
    return invNumbers;
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
    addBook(bookData, count) {
      const bookId = BooksCollection.insert(bookData);

      // Генерируем уникальные номера
      for (let i = 0; i < count; i++) {
        const number = generateBookNumber();

        inventoryNumbersCollection.insert({
          id_book: bookData.title,
          number,
        });
      }
      return bookId;
    },
    deleteBook: function (bookTitle) {
      deleteBook(bookTitle);
    },
  });
});
