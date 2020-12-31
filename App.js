/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import AppContainer from "./navigations";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers/main';

export default class App extends React.Component{
  render(){
    const  state= createStore(reducers,{},applyMiddleware(ReduxThunk))
    return(
        <Provider store={state}>
          <AppContainer/>
        </Provider>
    )
  }
}
