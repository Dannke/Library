import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { UsersCollection } from "../api/usersCollection";

export const DeleteUserForm = ({ onDeleteUser, onHideForm }) => {
  const [username, setUsername] = useState("");

  const [selectedUserId, setSelectedUserId] = useState(null);

  const { users, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe("users");

    if (!handle.ready()) {
      return { users: [] };
    }

    return {
      users: UsersCollection.find().fetch(),
    };
  });

  const handleDeleteUser = () => {
    const selectedUser = users.find((user) => user.username === username);

    if (selectedUser) {
      Meteor.call("deleteUser", selectedUser._id, (error) => {
        if (error) {
          alert("Ошибка при удалении пользователя: " + error.reason);
        } else {
          alert("Пользователь успешно удален");
          onDeleteUser();
        }
      });
    }
  };

  return (
    <div>
      <div className="form-field">
        <h2 className="HeaderForm">Удалить пользователя</h2>
        <label>Пользователь:</label>
        <select value={username} onChange={(e) => setUsername(e.target.value)}>
          <option>--Выбрать пользователя--</option>
          {users.map((u) => (
            <option key={u._id} value={u.username}>
              {u.username}
            </option>
          ))}
        </select>
      </div>

      <button
        className="small-button"
        onClick={handleDeleteUser}
        disabled={!username}
      >
        Удалить
      </button>
      <div className="button-spacing"></div>
      <button className="small-button" onClick={onHideForm}>
        Назад
      </button>
    </div>
  );
};
