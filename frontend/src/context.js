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

function reducer(state, action) {
  const i = action.payload.i
  const j = action.payload.j

  switch (action.type) {
    case 'update':
      state.data[i][j] = action.payload.text
      break;
    case 'reset':
      state.data[i][j] = ''
      break;
    case 'init':
      //let matrix;
      let updated = false;
      fetch('/init')
        .then(res => res.json())
          .then(data => {
            state.data = data.array
            console.log('updating...');
            //matrix = data.array
            updated = true;
      });
      console.log('updated', state.data);

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

      //do {
        //sleep(100);
        //console.log('blocking...');
      //} while (!updated);
      break;
    default:
      throw new Error();
  }
  return {...state};
}

export { Store, Provider };
