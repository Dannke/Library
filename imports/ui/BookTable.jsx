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
          <th>Place</th>
          <th>Edition</th>
          <th>UDC</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book._id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.year}</td>
            <td>{book.place}</td>
            <td>{book.edition}</td>
            <td>{book.udc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
