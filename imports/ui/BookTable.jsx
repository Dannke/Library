// ui/BookTable.jsx
import React from "react";

export const BookTable = ({ books }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Country</th>
          <th>Edition</th>
          <th>UDC</th>
          <th>Количество</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book._id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.year}</td>
            <td>{book.country}</td>
            <td>{book.edition}</td>
            <td>{book.udc}</td>
            <td>{book.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};