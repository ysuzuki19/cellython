import React, { useState, useEffect, useContext } from 'react';
import ContentEditable from "react-contenteditable";

import logo from './logo.svg';
import './App.scss';

import { Store } from './context';

function Cell(props) {
  const {state, dispatch} = useContext(Store);
  const i = props.i;
  const j = props.j;
  const value = state.data[i][j]

  const style_cell = {
    border: '1px solid black',
    boxSizing: 'border-box',
    overflow: 'hidden',
    height: '30px',
    maxHeight: '30px',
    width: '80px',
    maxWidth: '80px',
    float: 'left',
  };

  const style_editor = {
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

  //const [focus, setFocus] = useState({i:0, j:0});
  //const [range, setRange] = useState({from:{i:0,j:0}, to:{i:0,j:0}});

  useEffect(() => {
    dispatch({
      type: 'init',
      payload: {}
    });
  }, []);

  console.log('in sheet', state.data);
  //if(!state.data || !state.data[0]) {
  if(!state.data) {
    return null
  }

  console.log('data exist', state.data);
  return(
    <div className="sheet">
      {state.data.map((row, i) => {
        return(
          <div key={i}>
            {row.map((elm, j) => {
              return <Cell key={j} i={i} j={j} />
            })}
          </div>
        )
      })}
    </div>
  );
}

function App() {
  const {state, dispatch} = useContext(Store);

  return (
    <div className="App">
      <header className="App-header">
        <Sheet />
      </header>
    </div>
  );
}

export default App;
