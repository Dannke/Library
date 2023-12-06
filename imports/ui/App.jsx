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
import { UsersTable } from "./UsersTable.jsx";
import { DeleteUserForm } from "./DeleteUserFrom.jsx";
import "../Styles/NavBar.css"

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
  const [userRole, setUserRole] = useState(null);
  const [showDeleteUserForm, setShowDeleteUserForm] = useState(false);

  const { books, countries, editions, udc, readers, users, isLoading } =
    useTracker(() => {
      const editionsHandle = Meteor.subscribe("editions");
      const countriesHandle = Meteor.subscribe("countries");
      const udcHandle = Meteor.subscribe("udc");
      const handle = Meteor.subscribe("books");
      const invNumbersHandle = Meteor.subscribe("inventory_numbers");
      const readersHandle = Meteor.subscribe("readers");
      const abonementhandle = Meteor.subscribe("abonements");
      const usersHandle = Meteor.subscribe("users");

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
        users: UsersCollection.find().fetch(),
      };
    });

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
        setUserRole(result.role);
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
  };

  const handleShowDeleteUserForm = () => {
    setShowDeleteUserForm(true);
    setShowTable(false);
  };

  const handleShowUsersTable = () => {
    setShowTable(true);
    setShowDeleteUserForm(false);
  };

  const NavbarButton = ({ onClick, children }) => (
    <button className="navbar-button" onClick={onClick}>
      {children}
    </button>
  );

  const UserPanel = () => (
    <div className="navbar-container">
      <NavbarButton onClick={handleShowTable}>Показать книги</NavbarButton>
      <NavbarButton onClick={handleShowAddForm}>Добавить книгу</NavbarButton>
      <NavbarButton onClick={handleShowDeleteForm}>Удалить книгу</NavbarButton>
      <NavbarButton onClick={handleShowSearchForm}>Найти книги</NavbarButton>
      <NavbarButton onClick={handleShowEditForm}>Редактировать книги</NavbarButton>
      <NavbarButton onClick={handleShowReaders}>Показать читателей</NavbarButton>
      <NavbarButton onClick={handleShowBookManagementForm}>Добавить/Удалить книгу читателю</NavbarButton>
      <NavbarButton onClick={() => setIsLoggedIn(false)}>Выйти</NavbarButton>
    </div>
  );
  
  const AdminPanel = () => (
    <div className="navbar-container">
      <NavbarButton onClick={() => handleShowDeleteUserForm(true)}>Удалить пользователя</NavbarButton>
      <NavbarButton onClick={() => handleShowUsersTable(false)}>Показать пользователей</NavbarButton>
      <NavbarButton onClick={() => setIsLoggedIn(false)}>Выйти</NavbarButton>
    </div>
  );

  return (
    <div>
      {!isLoggedIn && !isRegistrationMode && (
        <div className="welcome-form">
          <h1>Добро пожаловать в библиотеку!</h1>
          <LoginForm
            onLogin={handleLogin}
            onShowRegistrationForm={handleShowRegistrationForm}
          />
        </div>
      )}
      {!isLoggedIn && isRegistrationMode && (
        <div className="welcome-form">
          <h1>Регистрация</h1>
          <RegistrationForm
            onRegister={handleRegistration}
            onCancelRegistration={handleShowLoginForm}
          />
        </div>
      )}
      {isLoggedIn && userRole === "user" && (
        <div>
          <UserPanel />
          <div className="content">
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
      )}
      {isLoggedIn && userRole === "admin" && (
        <div>
          <AdminPanel />
          <div className="content">
            <div className="content-wrapper">
              {showTable && <UsersTable users={users} />}

              {showDeleteUserForm && (
                <DeleteUserForm
                  onDeleteUser={() => {
                    setShowDeleteUserForm(false);
                  }}
                  onHideForm={() => setShowDeleteUserForm(false)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
