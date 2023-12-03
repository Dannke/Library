// ui/App.jsx
import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { BooksCollection } from "../api/booksCollection.js";
import { BookTable } from "./BookTable.jsx";
import { AddBookForm } from "./AddBookForm.jsx";
import { DeleteBookForm } from "./DeleteBookForm.jsx";

export const App = () => {
  const [showTable, setShowTable] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const { books, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('books');
    const isLoading = !handle.ready();
    const books = BooksCollection.find().fetch();
    return { books, isLoading };
  });

  const handleShowTable = () => {
    setShowTable(true);
    setShowAddForm(false);
    setShowDeleteForm(false);
  };

  const handleShowAddForm = () => {
    setShowTable(false);
    setShowAddForm(true);
    setShowDeleteForm(false);
  };

  const handleShowDeleteForm = () => {
    setShowTable(false);
    setShowAddForm(false);
    setShowDeleteForm(true);
  };

  const handleHideAddForm = () => {
    setShowTable(true);
    setShowAddForm(false);
    setShowDeleteForm(false);
  };

  const handleHideDeleteForm = () => {
    setShowTable(true);
    setShowAddForm(false);
    setShowDeleteForm(false);
  };

  return (
    <div>
      <div className="panel">
        <button className="button" onClick={handleShowTable}>Показать книги</button>
        <button className="button" onClick={handleShowAddForm}>Добавить книгу</button>
        <button className="button" onClick={handleShowDeleteForm}>Удалить книгу</button>
      </div>

      <div className="content">
        {showTable && (
          <>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <BookTable books={books} />
              </>
            )}
          </>
        )}

        {showAddForm && <AddBookForm onAddBook={handleShowTable} onHideForm={handleHideAddForm} />}
        {showDeleteForm && <DeleteBookForm onDeleteBook={handleHideDeleteForm} onHideForm={handleHideDeleteForm} />}
      </div>
    </div>
  );
};
