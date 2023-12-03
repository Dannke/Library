// ui/App.jsx
import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { BooksCollection } from "../api/booksCollection.js";
import { BookTable } from "./BookTable.jsx";
import { AddBookForm } from "./AddBookForm.jsx";
import { DeleteBookForm } from "./DeleteBookForm.jsx";
import { SearchBookForm } from "./SearchBookForm.jsx";
import { CountryCollection } from "../api/countryCollection.js";
import { EditionsCollection } from "../api/editionsCollection.js";
import { UdcCollection } from "../api/udcCollection.js";

export const App = () => {
  const [showTable, setShowTable] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const {books, countries, editions, udc, isLoading} = useTracker(() => {

    const editionsHandle = Meteor.subscribe('editions');  
    const countriesHandle = Meteor.subscribe('countries');
    const udcHandle = Meteor.subscribe('udc');
    const handle = Meteor.subscribe('books');
    const invNumbersHandle = Meteor.subscribe('inventory_numbers');
    
    if(!countriesHandle.ready()) {
      return {countries: []} 
    }
    if(!editionsHandle.ready()) {
      return {editions: []}  
    }
    if(!udcHandle.ready()) {
      return {udc: []} 
    }
  
    return {
      books: BooksCollection.find().fetch(),
      countries: CountryCollection.find().fetch(),
      editions: EditionsCollection.find().fetch(),
      udc: UdcCollection.find().fetch()

    };
  
  });

  const handleShowTable = () => {
    setShowTable(true);
    setShowAddForm(false);
    setShowDeleteForm(false);
    setShowSearchForm(false);
    setSearchResults([]);
  };

  const handleShowAddForm = () => {
    setShowTable(false);
    setShowAddForm(true);
    setShowDeleteForm(false);
    setShowSearchForm(false);
  };

  const handleShowDeleteForm = () => {
    setShowTable(false);
    setShowAddForm(false);
    setShowDeleteForm(true);
    setShowSearchForm(false);
  };

  const handleShowSearchForm = () => {
    setShowTable(false);
    setShowAddForm(false);
    setShowDeleteForm(false);
    setShowSearchForm(true);
  };

  const handleHideAddForm = () => {
    setShowTable(true);
    setShowAddForm(false);
    setShowDeleteForm(false);
    setShowSearchForm(false);
  };

  const handleHideDeleteForm = () => {
    setShowTable(true);
    setShowAddForm(false);
    setShowDeleteForm(false);
    setShowSearchForm(false);
  };

  const handleHideSearchForm = () => {
    setShowTable(true);
    setShowAddForm(false);
    setShowDeleteForm(false);
    setShowSearchForm(false);
  };

  return (
    <div>
      <div className="panel">
        <button className="button" onClick={handleShowTable}>Показать книги</button>
        <button className="button" onClick={handleShowAddForm}>Добавить книгу</button>
        <button className="button" onClick={handleShowDeleteForm}>Удалить книгу</button>
        <button className="button" onClick={handleShowSearchForm}>Найти книги</button>
      </div>

      <div className="content">
        {showTable && (
          <>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <BookTable books={searchResults.length > 0 ? searchResults : books} />
              </>
            )}
          </>
        )}

        {showAddForm && <AddBookForm onAddBook={handleShowTable} onHideForm={handleHideAddForm} />}
        {showDeleteForm && <DeleteBookForm onDeleteBook={handleShowDeleteForm} onHideForm={handleHideDeleteForm} />}
        {showSearchForm && (
          <SearchBookForm
            books={books}
            onSearch={setSearchResults}
            onHideForm={handleHideSearchForm}
          />
        )}
      </div>
    </div>
  );
};

