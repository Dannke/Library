// ui/ReadersTable.jsx
import React from "react";

export const ReadersTable = ({ readers }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="header-container">Имя</th>
            <th className="header-container">Фамилия</th>
            <th className="header-container">Отчество</th>
            <th className="header-container">Телофон</th>
            <th className="header-container">Адресс</th>
            <th className="header-container">Дата регистрации</th>
          </tr>
        </thead>
        <tbody>
          {readers.map((reader) => (
            <tr key={reader._id}>
              <td className="header-container">{reader.name}</td>
              <td className="header-container">{reader.surname}</td>
              <td className="header-container">{reader.patronymic}</td>
              <td className="header-container">{reader.telephone}</td>
              <td className="header-container">{reader.adress}</td>
              <td className="header-container">{reader.dateRegistration.toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};