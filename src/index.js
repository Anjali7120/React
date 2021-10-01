import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import {createStore} from 'redux'
import {Provider} from 'react-redux' //it makes the redux store available to react components
import cartReducer from '../src/Reducers/reducer'

//saving state in localstorage
function saveToLocalStorage(state){
  try{
    const State= JSON.stringify(state);
    localStorage.setItem("Data",State);
  }
  catch(e){
    console.warn(e)
  }
}

//loading state from localstorage
function loadFromLocalStorage(){
  try{
    const State= localStorage.getItem("Data");
    if(State===null) return undefined;
    return JSON.parse(State);
    
  }
  catch(e)
  {
    console.warn(e)
    return undefined;
  }
}

const store = createStore(cartReducer,loadFromLocalStorage()); //creating store and loading value from localstorage
store.subscribe(()=>saveToLocalStorage(store.getState())); //adding a change listener it will be called when an action is dispatched
ReactDOM.render(
  <Provider store={store}>
   <App />
  </Provider>,
  document.getElementById('root')
);
