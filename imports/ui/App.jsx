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
import { ReadersTable } from "./RedersTable.jsx";
import { ReadersCollection } from "../api/readersCollection.js";
import { EditBookForm } from "./EditBookForm.jsx";
import { BookManagement } from "./BookManagent.jsx";
import { LoginForm } from "./LoginForm.jsx";
import { UsersCollection } from "../api/usersCollection.js";
import { RegistrationForm } from "./RegistrationForm.jsx";

export const App = () => {
  const [showTable, setShowTable] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showReadersTable, setShowReadersTable] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [showBookManagementForm, setShowBookManagementForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistrationMode, setIsRegistrationMode] = useState(false);

  const { books, countries, editions, udc, readers, isLoading } = useTracker(
    () => {
      const editionsHandle = Meteor.subscribe("editions");
      const countriesHandle = Meteor.subscribe("countries");
      const udcHandle = Meteor.subscribe("udc");
      const handle = Meteor.subscribe("books");
      const invNumbersHandle = Meteor.subscribe("inventory_numbers");
      const readersHandle = Meteor.subscribe("readers");
      const abonementhandle = Meteor.subscribe("abonements");
      const usershandle = Meteor.subscribe("users");

      if (!countriesHandle.ready()) {
        return { countries: [] };
      }
      if (!editionsHandle.ready()) {
        return { editions: [] };
      }
      if (!udcHandle.ready()) {
        return { udc: [] };
      }

      return {
        books: BooksCollection.find().fetch(),
        countries: CountryCollection.find().fetch(),
        editions: EditionsCollection.find().fetch(),
        udc: UdcCollection.find().fetch(),
        readers: ReadersCollection.find().fetch(),
      };
    }
  );

  const handleRegistration = (username, password, confirmPassword) => {
    Meteor.call(
      "registerUser",
      username,
      password,
      confirmPassword,
      (error, result) => {
        if (error) {
          alert(error.reason);
        } else {
          alert("Регистрация успешна");
          setIsRegistrationMode(false);
        }
      }
    );
  };

  const handleLogin = (username, password) => {
    Meteor.call("login", username, password, (error, result) => {
      if (error) {
        alert(error.reason);
      } else {
        setIsLoggedIn(true);
      }
    });
  };

  const handleShowReaders = () => {
    setShowReadersTable(true);
    setShowTable(true);
    setShowEditForm(false);
    setShowBookManagementForm(false);
  };

  const handleShowEditForm = () => {
    setShowEditForm(true);
    setShowTable(false);
    setShowAddForm(false);
    setShowDeleteForm(false);
    setShowSearchForm(false);
    setShowBookManagementForm(false);
    setSearchResults([]);
  };

  const handleHideEditForm = () => {
    setShowEditForm(false);
    setShowTable(true);
    setSelectedBook(null);
    setSelectedField(null);
  };

  const handleShowTable = () => {
    setShowTable(true);
    setShowAddForm(false);
    setShowEditForm(false);
    setShowReadersTable(false);
    setShowDeleteForm(false);
    setShowSearchForm(false);
    setShowBookManagementForm(false);
    setSearchResults([]);
  };

  const handleShowAddForm = () => {
    setShowTable(false);
    setShowAddForm(true);
    setShowDeleteForm(false);
    setShowSearchForm(false);
    setShowEditForm(false);
    setShowBookManagementForm(false);
  };

  const handleShowDeleteForm = () => {
    setShowTable(false);
    setShowAddForm(false);
    setShowDeleteForm(true);
    setShowSearchForm(false);
    setShowEditForm(false);
    setShowBookManagementForm(false);
  };

  const handleShowSearchForm = () => {
    setShowTable(false);
    setShowAddForm(false);
    setShowDeleteForm(false);
    setShowSearchForm(true);
    setShowEditForm(false);
    setShowBookManagementForm(false);
    setShowReadersTable(false);
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

  const handleShowBookManagementForm = () => {
    setShowBookManagementForm(true);
    setShowSearchForm(false);
    setShowDeleteForm(false);
    setShowAddForm(false);
    setShowTable(false);
    setShowEditForm(false);
  };

  const handleShowLoginForm = () => {
    setIsRegistrationMode(false);
  };

  const handleShowRegistrationForm = () => {
    setIsRegistrationMode(true);
  }

  return (
    <div>
      {!isLoggedIn && !isRegistrationMode && (
        <div className="welcome-form">
          <h1>Добро пожаловать в библиотеку!</h1>
          <LoginForm onLogin={handleLogin} />
          <button onClick={handleShowRegistrationForm}>Регистрация</button>
        </div>
      )}
      {!isLoggedIn && isRegistrationMode && (
        <div className="welcome-form">
          <h1>Регистрация</h1>
          <RegistrationForm onRegister={handleRegistration} />
          <button onClick={handleShowLoginForm}>Назад к входу</button>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <div className="panel-container">
            <button className="button" onClick={handleShowTable}>
              Показать книги
            </button>
            <button className="button" onClick={handleShowAddForm}>
              Добавить книгу
            </button>
            <button className="button" onClick={handleShowDeleteForm}>
              Удалить книгу
            </button>
            <button className="button" onClick={handleShowSearchForm}>
              Найти книги
            </button>
            <button className="button" onClick={handleShowEditForm}>
              Редактировать книги
            </button>
            <button className="button" onClick={handleShowReaders}>
              Показать читателей
            </button>
            <button className="button" onClick={handleShowBookManagementForm}>
              Добавить/Удалить книгу читателю
            </button>
            <button className="button" onClick={() => setIsLoggedIn(false)}>
              Выйти
            </button>
          </div>

          <div className="content">
            <div className="content-wrapper">
              <div className="content-wrapper">
                {showTable && (
                  <>
                    {isLoading ? (
                      <p>Loading...</p>
                    ) : (
                      <>
                        {showReadersTable ? (
                          <ReadersTable readers={readers} />
                        ) : (
                          <BookTable
                            books={
                              searchResults.length > 0 ? searchResults : books
                            }
                          />
                        )}
                      </>
                    )}
                  </>
                )}

                {showAddForm && (
                  <AddBookForm
                    onAddBook={handleShowTable}
                    onHideForm={handleHideAddForm}
                  />
                )}
                {showDeleteForm && (
                  <DeleteBookForm
                    onDeleteBook={handleShowDeleteForm}
                    onHideForm={handleHideDeleteForm}
                  />
                )}
                {showSearchForm && (
                  <SearchBookForm
                    books={books}
                    onSearch={setSearchResults}
                    onHideForm={handleHideSearchForm}
                  />
                )}
                {showEditForm && (
                  <EditBookForm
                    books={books}
                    selectedBook={selectedBook}
                    selectedField={selectedField}
                    onEditBook={handleHideEditForm}
                  />
                )}
                {showBookManagementForm && <BookManagement />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
