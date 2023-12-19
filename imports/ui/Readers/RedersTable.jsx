import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { AbonementCollection } from "../../api/abonementCollection";
import { inventoryNumbersCollection } from "../../api/inventoryNumbersCollection";

export const ReadersTable = ({ readers }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="header-container">Имя</th>
            <th className="header-container">Фамилия</th>
            <th className="header-container">Отчество</th>
            <th className="header-container">Телефон</th>
            <th className="header-container">Адрес</th>
            <th className="header-container">Дата регистрации</th>
            <th className="header-container">Книги</th>
          </tr>
        </thead>

        <tbody>
          {readers.map((reader) => {
            const { abonements, abonementsLoading } = useTracker(() => {
              const handle = Meteor.subscribe("readerAbonements");

              return {
                abonements: AbonementCollection.find({ id_reader: reader._id }).fetch(),
                abonementsLoading: !handle.ready(),
              };
            });

            return (
              <tr key={reader._id}>
                <td className="content-container">{reader.name}</td>
                <td className="content-container">{reader.surname}</td>
                <td className="content-container">{reader.patronymic}</td>
                <td className="content-container">{reader.telephone}</td>
                <td className="content-container">{reader.adress}</td>
                <td className="content-container">
                  {reader.dateRegistration.toLocaleDateString()}
                </td>
                <td className="content-container">
                  {abonementsLoading ? (
                    <div>Loading...</div>
                  ) : (
                    abonements.map((abonement) => {
                      const bookInfo = inventoryNumbersCollection.findOne({
                        _id: abonement.book_number_id,
                      });
                      return (
                        <div key={abonement._id}>
                          {bookInfo ? bookInfo.number : "Номер не найден"}
                        </div>
                      );
                    })
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
