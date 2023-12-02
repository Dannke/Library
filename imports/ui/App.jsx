// ui/App.jsx
import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { BooksCollection } from "../api/booksCollection.js";
import { BookTable } from "./BookTable.jsx";

export const App = () => {
  const [showTable, setShowTable] = useState(false);

  const { books, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('books');
    const isLoading = !handle.ready();
    const books = BooksCollection.find().fetch();
    return { books, isLoading };
  });

  const handleShowTable = () => {
    setShowTable(true);
  };

  return (
    <div>
      <h1>Welcome to Meteor!</h1>

      <div>
        <button onClick={handleShowTable}>Показать книги</button>
      </div>

      {showTable && (
        <>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <BookTable books={books} />
              {/* Здесь можете добавить другие элементы, если нужно */}
            </>
          )}
        </>
      )}
    </div>
  );
};
