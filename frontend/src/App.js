import React, { useState, useEffect, useRef, useReducer, useContext } from 'react';
import ContentEditable from "react-contenteditable";

import logo from './logo.svg';
import './App.css';


const Store = React.createContext();

const initialState = {
  data: [['1', '2', '3'], ['4', '5', '6']],
  view: [['1', '2', '3'], ['4', '5', '6']],
}
const Provider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>
}

function reducer(state, action) {
  const i = action.payload.i
  const j = action.payload.j

  switch (action.type) {
    case 'update':
      state.data[i][j] = action.payload.text
      return {...state};
    case 'reset':
      state.data[i][j] = ''
      return {...state};
    default:
      throw new Error();
  }
}

function Cell(props) {
  const {state, dispatch} = useContext(Store);
  const i = props.i;
  const j = props.j;
  const value = state.data[i][j]

  const style_cell = {
    border: '1px solid black',
    overflow: 'hidden',
    height: '25px',
    maxHeight: '25px',
    width: '80px',
    maxWidth: '80px',
    float: 'left'
  };

  const handleChange = evt => {
    console.log('changed');
    dispatch({
      type: 'update',
      payload: {
        i: i,
        j: j,
        text: evt.target.value
      }
    });
  };

  const handleBlur = () => {
    console.log('blured');
  };

  const handleFocus = () => {
    console.log('focused');
  };

  return(
    <ContentEditable
      html={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      style={style_cell}
    />
  );
}

function Sheet() {
  const {state, dispatch} = useContext(Store);

  const [focus, setFocus] = useState({i:0, j:0});
  const [range, setRange] = useState({from:{i:0,j:0}, to:{i:0,j:0}});

  return(
    <div class="sheet">
      {state.data.map((row, i) => {
        return(
          <div>
            {row.map((elm, j) => {
              return <Cell i={i} j={j} />
            })}
          </div>
        )
      })}
    </div>
  );
}

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <Provider>
        <header className="App-header">
          <p>The current time is {currentTime}.</p>
          <Sheet />
        </header>
      </Provider>
    </div>
  );
}

export default App;
