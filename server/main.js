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
  const book = BooksCollection.findOne({ title: bookTitle });

  if (book) {
    BooksCollection.remove({ _id: book._id });
    inventoryNumbersCollection.remove({ book: bookTitle });
  }
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
  Meteor.publish("readers", function () {
    const readers = ReadersCollection.find();
    return readers;
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
          book: bookData.title,
          number,
        });
      }
      return bookId;
    },
    deleteBook: function (bookTitle) {
      deleteBook(bookTitle);
    },
    editBookField: function (bookId, field, value) {
      check(bookId, String);
      check(field, String);
  
      const allowedFields = ["title", "author", "year", "country", "edition", "udc"];
  
      if (!allowedFields.includes(field)) {
        throw new Meteor.Error("invalid-field", "Попытка редактирования недопустимого поля.");
      }
  
      const update = {};
      update[field] = value;
  
      // Обновляем данные в коллекции BooksCollection
      BooksCollection.update(bookId, { $set: update });
  
      // Если изменено название книги, обновляем соответствующие инвентарные номера
      if (field === "title") {
        // Находим все документы, которые содержат старое название книги
        const inventoryNumbersToUpdate = inventoryNumbersCollection.find({ book: bookId }).fetch();
        console.log(inventoryNumbersToUpdate);
        // Обновляем каждый документ в коллекции inventoryNumbersCollection
        inventoryNumbersToUpdate.forEach((inventoryNumber) => {
          inventoryNumbersCollection.update(
            { _id: inventoryNumber._id },
            { $set: { book: value } }
          );
        });
      }
    },
  });
});
