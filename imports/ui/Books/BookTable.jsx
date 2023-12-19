// ui/BookTable.jsx
import React from "react";
import "../../Styles/BookTable.css";

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
              <td className="content-container" data-label="Название">
                {book.title}
              </td>
              <td className="content-container" data-label="Автор">
                {book.author}
              </td>
              <td className="content-container" data-label="Год">
                {book.year}
              </td>
              <td className="content-container" data-label="Страна">
                {book.country}
              </td>
              <td className="content-container" data-label="Издательство">
                {book.edition}
              </td>
              <td className="content-container" data-label="UDC">
                {book.udc}
              </td>
              <td className="content-container" data-label="Количество">
                {book.count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
