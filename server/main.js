// server/main.js
import { Meteor } from "meteor/meteor";
import { BooksCollection } from "/imports/api/booksCollection";
import { ReadersCollection } from "../imports/api/readersCollection";
import { check } from "meteor/check";
import { CountryCollection } from "../imports/api/countryCollection";
import { EditionsCollection } from "../imports/api/editionsCollection";
import { UdcCollection } from "../imports/api/udcCollection";
import { inventoryNumbersCollection } from "../imports/api/inventoryNumbersCollection";
import { AbonementCollection } from "../imports/api/abonementCollection";
import { UsersCollection } from "../imports/api/usersCollection";

function deleteBook(bookTitle) {
  check(bookTitle, String);
  const book = BooksCollection.findOne({ title: bookTitle });

  if (book) {
    inventoryNumbersCollection.remove({ bookId: book._id });
    BooksCollection.remove({ _id: book._id });
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
  if (UsersCollection.find().count() === 0) {
    UsersCollection.insert({
      username: "admin",
      password: "123",
      role: "admin",
    });
  }
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

  Meteor.publish("users", function () {
    const users = UsersCollection.find();
    return users;
  });
  Meteor.publish("readerAbonements", function (readerId) {
    const abonements = AbonementCollection.find();
    return abonements;
  });

  Meteor.methods({
    addBook(bookData, count) {
      if (bookData.year < 0) {
        throw new Meteor.Error(
          "year-below-zero",
          "Год не может быть отрицательным."
        );
      } else if (bookData.year > 2023) {
        throw new Meteor.Error(
          "year-hight",
          "Год не может быть больше текущего."
        );
      }

      if (/\d/.test(bookData.author)) {
        throw new Meteor.Error(
          "author-int",
          "В поле `Автор` могут быть только буквы."
        );
      }

      if (count < 0) {
        throw new Meteor.Error(
          "count-below-zero",
          "Количество не может быть отрицательным."
        );
      }
      const bookId = BooksCollection.insert(bookData);

      for (let i = 0; i < count; i++) {
        const number = generateBookNumber();

        inventoryNumbersCollection.insert({
          bookId: bookId,
          number,
        });
      }
      return bookId;
    },
    deleteBook: function (bookTitle) {
      if (BooksCollection.findOne({ title: bookTitle })) {
        deleteBook(bookTitle);
      } else {
        throw new Meteor.Error(
          "unknow-book",
          "Данной книги нет в базе данных."
        );
      }
    },
    editBookField: function (bookId, field, value) {
      check(bookId, String);
      check(field, String);

      const allowedFields = [
        "title",
        "author",
        "year",
        "country",
        "edition",
        "udc",
      ];

      if (!allowedFields.includes(field)) {
        throw new Meteor.Error(
          "invalid-field",
          "Попытка редактирования недопустимого поля."
        );
      }

      const update = {};
      update[field] = value;
      BooksCollection.update(bookId, { $set: update });

      // Если изменено название книги, обновляем соответствующие инвентарные номера
      if (field === "title") {
        const inventoryNumbersToUpdate = inventoryNumbersCollection
          .find({ bookId: bookId })
          .fetch();

        // Обновляем каждый документ в коллекции inventoryNumbersCollection
        inventoryNumbersToUpdate.forEach((inventoryNumber) => {
          inventoryNumbersCollection.update(
            { _id: inventoryNumber._id },
            { $set: { bookId: value } }
          );
        });
      }
    },
    addBookToAbonement: function (readerId, bookId, issueDate, deliveryDate) {
      check(readerId, String);
      check(bookId, String);
      check(issueDate, Date);

      // Проверяем, если deliveryDate предоставлен, он должен быть датой
      if (deliveryDate && !(deliveryDate instanceof Date)) {
        throw new Meteor.Error(
          "invalid-date",
          "Дата возврата должна быть объектом Date"
        );
      }
      const abonementData = {
        id_reader: readerId,
        book_number_id: bookId,
        issue_date: issueDate,
      };

      // Если deliveryDate предоставлен, добавляем его в abonementData
      if (deliveryDate) {
        abonementData.delivery_date = deliveryDate;
      }
      return AbonementCollection.insert(abonementData);
    },
    removeBookFromAbonement: function (readerId, bookId) {
      check(readerId, String);
      check(bookId, String);

      const abonementData = {
        id_reader: readerId,
        book_number_id: bookId,
      };

      const abonementEntry = AbonementCollection.findOne(abonementData);
      if (abonementEntry) {
        AbonementCollection.remove(abonementEntry._id);
      }
    },
    login(username, password) {
      check(username, String);
      check(password, String);

      const user = UsersCollection.findOne({ username });

      if (!user || user.password !== password) {
        throw new Meteor.Error("Login failed");
      }

      return {
        username: user.username,
        role: user.role,
      };
    },
    registerUser(username, password, confirmPassword) {
      check(username, String);
      check(password, String);
      check(confirmPassword, String);

      if (password !== confirmPassword) {
        throw new Meteor.Error("password-mismatch", "Пароли не совпадают");
      }

      if (UsersCollection.findOne({ username })) {
        throw new Meteor.Error(
          "user-exists",
          "Пользователь с таким логином уже существует"
        );
      }
      const role = "user";
      UsersCollection.insert({ username, password, role });

      return "Успешно!";
    },
    deleteUser(userId) {
      const userToDelete = UsersCollection.findOne(userId);
      if (userToDelete && userToDelete.role !== "admin") {
        UsersCollection.remove(userId);
      } else {
        throw new Meteor.Error(
          "delete-admin-error",
          "Невозможно удалить администратора"
        );
      }
    },
    availableBooks() {
      // Получаем _id всех книг, которые уже выданы
      const issuedBookIds = AbonementCollection.find({
        delivery_date: null,
      }).map((abonement) => abonement.book_number_id);
      // Получаем все книги, _id которых не находится в issuedBookIds
      const availableBooks = inventoryNumbersCollection
        .find({
          _id: { $nin: issuedBookIds },
        })
        .fetch();

      return availableBooks;
    },
    getIssuedBooks: function (readerId) {
      check(readerId, String);

      const issuedBookIds = AbonementCollection.find({
        id_reader: readerId,
        delivery_date: null,
      }).map((abonement) => abonement.book_number_id);

      const IssuedBooks = inventoryNumbersCollection
        .find({
          _id: { $in: issuedBookIds },
        })
        .fetch();
      return IssuedBooks;
    },
  });
});
