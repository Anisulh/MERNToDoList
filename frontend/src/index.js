import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {DragDropContext} from 'react-beautiful-dnd'

const container = document.getElementById('root');
const root = createRoot(container);
function onDragEnd(){

}
root.render(
  <React.StrictMode>
    <DragDropContext onDragEnd={onDragEnd}>
      <Provider store={store}>
        <App />
      </Provider>
    
    </DragDropContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
