import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { BooksCollection } from "../../api/booksCollection";
import { useTracker } from "meteor/react-meteor-data";
import { CountryCollection } from "../../api/countryCollection";
import { EditionsCollection } from "../../api/editionsCollection";
import { UdcCollection } from "../../api/udcCollection";

export const EditBookForm = ({ books, onEditBook, onHideForm }) => {
  const [selectedBookId, setSelectedBookId] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [newValue, setNewValue] = useState("");

  const { countries, editions, udc } = useTracker(() => {
    return {
      countries: CountryCollection.find({}, { sort: { country: 1 } }).fetch(),
      editions: EditionsCollection.find({}, { sort: { edition: 1 } }).fetch(),
      udc: UdcCollection.find({}, { sort: { udc: 1 } }).fetch(),
    };
  });

  const handleEditBook = () => {
    if (!selectedBookId || !selectedField || !newValue) {
      alert("Пожалуйста, выберите книгу, поле и введите новое значение.");
      return;
    }

    const update = {};

    if (selectedField === "country") {
      update[selectedField] = newValue;
    } else if (selectedField === "edition") {
      update[selectedField] = newValue;
    } else if (selectedField === "udc") {
      update[selectedField] = newValue;
    } else {
      update[selectedField] = newValue;
    }

    Meteor.call(
      "editBookField",
      selectedBookId,
      selectedField,
      newValue,
      (error, result) => {
        if (!error) {
          onEditBook(); // Сообщаем родительскому компоненту об успешном редактировании
          onHideForm();
        } else {
          alert(`Ошибка при редактировании книги: ${error.reason}`);
        }
      }
    );
  };

  const renderFieldForm = () => {
    if (selectedField === "country") {
      return (
        <select value={newValue} onChange={(e) => setNewValue(e.target.value)}>
          <option value="">-- Выберите страну --</option>
          {countries.map((country) => (
            <option key={country._id} value={country._id}>
              {country.country}
            </option>
          ))}
        </select>
      );
    } else if (selectedField === "edition") {
      return (
        <select value={newValue} onChange={(e) => setNewValue(e.target.value)}>
          <option value="">-- Выберите издание --</option>
          {editions.map((edition) => (
            <option key={edition._id} value={edition._id}>
              {edition._id}
            </option>
          ))}
        </select>
      );
    } else if (selectedField === "udc") {
      return (
        <select value={newValue} onChange={(e) => setNewValue(e.target.value)}>
          <option value="">-- Выберите UDC --</option>
          {udc.map((udcItem) => (
            <option key={udcItem._id} value={udcItem._id}>
              {udcItem._id}
            </option>
          ))}
        </select>
      );
    } else {
      return (
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
      );
    }
  };

  return (
    <div>
      <h2 className="HeaderForm">Редактировать книгу</h2>
      <div className="form-field">
        <label>Выберите книгу:</label>
        <select
          value={selectedBookId}
          onChange={(e) => setSelectedBookId(e.target.value)}
        >
          <option value="">-- Выберите книгу --</option>
          {books.map((book) => (
            <option key={book._id} value={book._id}>
              {book.title}
            </option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label>Выберите поле для редактирования:</label>
        <select
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
        >
          <option value="">-- Выберите поле --</option>
          <option value="title">Название</option>
          <option value="author">Автор</option>
          <option value="year">Год</option>
          <option value="country">Страна</option>
          <option value="edition">Издание</option>
          <option value="udc">UDC</option>
          {/* Добавьте другие поля, которые можно редактировать */}
        </select>
      </div>
      <div className="form-field">
        <label>Введите новое значение:</label>
        {renderFieldForm()}
      </div>
      <button className="small-button" onClick={handleEditBook}>
        Применить
      </button>
      <div className="button-spacing"></div>
      <button className="small-button" onClick={onHideForm}>
        Отмена
      </button>
    </div>
  );
};
