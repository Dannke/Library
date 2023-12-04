// ui/BookTable.jsx
import React from "react";

export const BookTable = ({ books }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="header-container">Название</th>
            <th className="header-container">Автор</th>
            <th className="header-container">Год</th>
            <th className="header-container">Страна</th>
            <th className="header-container">Издательство</th>
            <th className="header-container">UDC</th>
            <th className="header-container">Количество</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td className="header-container">{book.title}</td>
              <td className="header-container">{book.author}</td>
              <td className="header-container">{book.year}</td>
              <td className="header-container">{book.country}</td>
              <td className="header-container">{book.edition}</td>
              <td className="header-container">{book.udc}</td>
              <td className="header-container">{book.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
