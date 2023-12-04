// ui/SearchBookForm.jsx
import React, { useState } from "react";

export const SearchBookForm = ({ books, onSearch, onHideForm }) => {
  const [searchTitle, setSearchTitle] = useState("");

  const handleSearch = () => {
    const regex = new RegExp(searchTitle, "i");
    const searchResults = books.filter((book) => regex.test(book.title));

    onSearch(searchResults);
    onHideForm(); // Теперь вызываем onHideForm, чтобы закрыть форму после выполнения поиска
  };

  return (
    <div>
      <h2 className="HeaderForm">Поиск книг</h2>
      <div className="form-field">
        <label>Название:</label>
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Найти</button>
      <button onClick={onHideForm}>Отмена</button>
    </div>
  );
};
