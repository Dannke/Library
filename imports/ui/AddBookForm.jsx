// ui/AddBookForm.jsx
import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { BooksCollection } from "../api/booksCollection";

export const AddBookForm = ({ onAddBook }) => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    year: 0,
    place: "",
    edition: "",
    udc: "",
  });

  const handleChange = (field, value) => {
    setBookData({ ...bookData, [field]: value });
  };

  const handleAddBook = () => {
    if (Object.values(bookData).every((value) => value !== "")) {
      Meteor.call('addBook', bookData, (error, result) => {
        if (!error) {
          onAddBook(); // Сообщаем родительскому компоненту об успешном добавлении
          onHideForm();
          setBookData({
            title: "",
            author: "",
            year: 0,
            place: "",
            edition: "",
            udc: "",
          });
        } else {
          alert(`Ошибка при добавлении книги: ${error.reason}`);
        }
      });
    } else {
      alert("Пожалуйста, заполните все поля.");
    }
  };

  return (
    <div>
      <h2>Добавить книгу</h2>
      <div className="form-field">
        <label>Название:</label>
        <input
          type="text"
          value={bookData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>
      <div className="form-field">
        <label>Автор:</label>
        <input
          type="text"
          value={bookData.author}
          onChange={(e) => handleChange("author", e.target.value)}
        />
      </div>
      <div className="form-field">
        <label>Год:</label>
        <input
          type="number"
          value={bookData.year}
          onChange={(e) => handleChange("year", e.target.value)}
        />
      </div>
      <div className="form-field">
        <label>Место:</label>
        <input
          type="text"
          value={bookData.place}
          onChange={(e) => handleChange("place", e.target.value)}
        />
      </div>
      <div className="form-field">
        <label>Редакция:</label>
        <input
          type="text"
          value={bookData.edition}
          onChange={(e) => handleChange("edition", e.target.value)}
        />
      </div>
      <div className="form-field">
        <label>UDC:</label>
        <input
          type="text"
          value={bookData.udc}
          onChange={(e) => handleChange("udc", e.target.value)}
        />
      </div>
      <button onClick={handleAddBook}>Добавить</button>
    </div>
  );
};
