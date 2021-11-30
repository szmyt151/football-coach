import React from "react";
import axios from '../../axios'
var UsersStateContext = React.createContext();
var UsersDispatchContext = React.createContext();

function usersReducer(state, action) {
  switch (action.type) {
    case "USERS_FETCHED":
      return { ...state, users: action.payload };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UsersProvider({ children }) {
  var [state, dispatch] = React.useReducer(usersReducer, {
    users: []
  });

  return (
    <UsersStateContext.Provider value={state}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersStateContext.Provider>
  );
}

function useUsersState() {
  var context = React.useContext(UsersStateContext);
  if (context === undefined) {
    throw new Error("useUsersState must be used within a UsersProvider");
  }
  return context;
}

function useUsersDispatch() {
  var context = React.useContext(UsersDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UsersProvider, useUsersState, useUsersDispatch, fetchUsers };

// ###########################################################

async function fetchUsers(dispatch, setRows) {
    try {
      const { data } = await axios.get('/users')

      setRows(data)
      dispatch({ type: 'USERS_FETCHED', payload: data })
    } catch (error) {
      console.log(error)
    }
}

