// ui/UsersTable.jsx
import React, { useState } from "react";

export function UsersTable({users}) {

    return (
      <table>
        <thead>
          <tr>
            <th>Логин</th>
            <th>Роль</th> 
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  
  }