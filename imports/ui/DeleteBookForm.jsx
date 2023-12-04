// ui/DeleteBookForm.jsx
import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

export const DeleteBookForm = ({ onDeleteBook, onHideForm }) => {
  const [bookTitle, setBookTitle] = useState("");

  const handleDeleteBook = () => {
    if (bookTitle.trim() !== "") {
      Meteor.call('deleteBook', bookTitle, (error, result) => {
        if (!error) {
          onDeleteBook();
          onHideForm(); // Скрываем форму после успешного удаления
          setBookTitle("");
        } else {
          alert(`Ошибка при удалении книги: ${error.reason}`);
        }
      });
    } else {
      alert("Пожалуйста, введите название книги для удаления.");
    }
  };

  return (
    <div>
      <h2 className="HeaderForm">Удалить книгу</h2>
      <div className="form-field">
        <label>Название:</label>
        <input
          type="text"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
        />
      </div>
      <button onClick={handleDeleteBook}>Удалить</button>
    </div>
  );
};