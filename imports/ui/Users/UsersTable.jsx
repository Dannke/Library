// ui/UsersTable.jsx
import React, { useState } from "react";

export function UsersTable({users}) {

    return (
      <table>
        <thead>
          <tr>
            <th className="header-container">Логин</th>
            <th className="header-container">Роль</th> 
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td className="content-container">{u.username}</td>
              <td className="content-container">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  
  }