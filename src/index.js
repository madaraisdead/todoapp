import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import './App.scss'
import reducers from './reducers'
import { AuthContextProvider } from './context/AuthContext';
import { createBrowserHistory } from 'history'

const store = createStore(reducers, compose(applyMiddleware(thunk)))
export const history = createBrowserHistory()
ReactDOM.render(
  <AuthContextProvider>
  <Provider store = {store}>
     <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </AuthContextProvider>,
  

  document.getElementById('root')
);
