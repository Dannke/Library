// ui/BookManagement.jsx
import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { ReadersCollection } from "../api/readersCollection";
import { AbonementCollection } from "../api/abonementCollection";
import { inventoryNumbersCollection } from "../api/inventoryNumbersCollection";

export const BookManagement = () => {
  const [selectedReader, setSelectedReader] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [action, setAction] = useState("add");
  const [issueDate, setIssueDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(null);

  const { readers, books } = useTracker(() => {
    return {
      readers: ReadersCollection.find().fetch(),
      books: inventoryNumbersCollection.find().fetch(),
    };
  });

  const handleAction = () => {
    if (selectedReader && selectedBook) {
      const formattedIssueDate = new Date(issueDate);

      if (action === "add") {
        Meteor.call(
          "addBookToAbonement",
          selectedReader,
          selectedBook,
          formattedIssueDate,
          deliveryDate
        );
      } else if (action === "remove") {
        Meteor.call(
          "removeBookFromAbonement",
          selectedReader,
          selectedBook,
          deliveryDate
        );
      }
    } else {
      alert("Выберите читателя и книгу");
    }
  };

  return (
    <div>
      <div className="form-field">
        <label>Выберите читателя:</label>
        <select
          value={selectedReader}
          onChange={(e) => setSelectedReader(e.target.value)}
        >
          <option value="">-- Выберите читателя --</option>
          {readers.map((reader) => (
            <option key={reader._id} value={reader._id}>
              {reader.name} {reader.surname}
            </option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label>Действие:</label>
        <select value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="add">Добавить книгу</option>
          <option value="remove">Удалить книгу</option>
        </select>
      </div>
      <div className="form-field">
        <label>Выберите книгу:</label>
        <select
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
        >
          <option value="">-- Выберите книгу --</option>
          {books.map((book) => (
            <option key={book._id} value={book.book_number_id}>
              {book.number}
            </option>
          ))}
        </select>
      </div>
      {action === "add" && (
        <div className="form-field">
          <label>Дата взятия:</label>
          <input
            type="date"
            value={issueDate.toISOString().split("T")[0]}
            onChange={(e) => setIssueDate(new Date(e.target.value))}
          />
        </div>
      )}
      {action === "remove" && (
        <div className="form-field">
          <label>Дата возврата:</label>
          <input
            type="date"
            value={deliveryDate ? deliveryDate.toISOString().split("T")[0] : ""}
            onChange={(e) => setDeliveryDate(new Date(e.target.value))}
          />
        </div>
      )}

      <button className="small-button" onClick={handleAction}>Применить</button>
    </div>
  );
};
