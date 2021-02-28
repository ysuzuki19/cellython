import React, { useReducer, useContext } from 'react';

const Store = React.createContext();

let initialState = {
  //data: [],
  data: [['2', '2', '3'], ['4', '5', '6']],
  //view: [['1', '2', '3'], ['4', '5', '6']],
}

const Provider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return(
    <Store.Provider value={{state, dispatch}}>
      {children}
    </Store.Provider>
  );
}

async function reducer(state, action) {
  const i = action.payload.i
  const j = action.payload.j

  switch (action.type) {
    case 'update':
      state.data[i][j] = action.payload.text
      return {...state};
    case 'reset':
      state.data[i][j] = ''
      return {...state};
    case 'init':
      await fetch('/init')
        .then(res => res.json())
          .then(data => {
            state.data = data.array
      });
      console.log('updated', state.data);
      return {...state};
    default:
      throw new Error();
  }
}

export { Store, Provider };
