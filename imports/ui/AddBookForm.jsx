// ui/AddBookForm.jsx
import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { BooksCollection } from "../api/booksCollection";
import { CountryCollection } from "../api/countryCollection";
import { useTracker } from "meteor/react-meteor-data";
import { EditionsCollection } from "../api/editionsCollection";
import { UdcCollection } from "../api/udcCollection";
import "../Styles/AddBookForm.css"

export const AddBookForm = ({ onAddBook }) => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    year: 0,
    country: "",
    edition: "",
    udc: "",
    count: 0,
  });

  const { countries, editions, udc } = useTracker(() => {
    return {
      countries: CountryCollection.find({}, { sort: { country: 1 } }).fetch(),
      editions: EditionsCollection.find({}, { sort: { edition: 1 } }).fetch(),
      udc: UdcCollection.find({}, { sort: { udc: 1 } }).fetch(),
    };
  });

  const handleChange = (field, value) => {
    setBookData({ ...bookData, [field]: value });
  };

  const handleAddBook = () => {
    if (Object.values(bookData).every((value) => value !== "")) {
      const count = bookData.count;
      Meteor.call("addBook", bookData, count, (error) => {
        if (!error) {
          onAddBook(); // Сообщаем родительскому компоненту об успешном добавлении
          setBookData({
            title: "",
            author: "",
            year: 0,
            country: "",
            edition: "",
            udc: "",
            count: 0,
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
    <div className="welcome-form">
    <h2 className="HeaderForm">Добавить книгу</h2>
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
        onChange={(e) => handleChange("year", parseInt(e.target.value))}
      />
    </div>
    <div className="form-field">
      <label>Страна:</label>
      <select
        value={bookData.country}
        onChange={(e) => handleChange("country", e.target.value)}
      >
        <option value="">-- Выберите страну --</option>
        {countries.map((country) => (
          <option key={country._id} value={country._id}>
            {country.country}
          </option>
        ))}
      </select>
    </div>
    <div className="form-field">
      <label>Издание:</label>
      <select
        value={bookData.edition}
        onChange={(e) => handleChange("edition", e.target.value)}
      >
        <option value="">-- Выберите издание --</option>
        {editions.map((edition) => (
          <option key={edition._id} value={edition._id}>
            {edition._id}
          </option>
        ))}
      </select>
    </div>
    <div className="form-field">
      <label>UDC:</label>
      <select
        value={bookData.udc}
        onChange={(e) => handleChange("udc", e.target.value)}
      >
        <option value="">-- Выберите UDC --</option>
        {udc.map((udc) => (
          <option key={udc._id} value={udc._id}>
            {udc._id}
          </option>
        ))}
      </select>
    </div>
    <div className="form-field">
      <label>Количество:</label>
      <input
        type="number"
        value={bookData.count}
        onChange={(e) => setBookData({ ...bookData, count: e.target.value })}
      />
    </div>
    <button className="small-button" onClick={handleAddBook}>
      Добавить
    </button>
  </div>  
  );
};
