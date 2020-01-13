import React from 'react';
import AddCard from './AddCard';
import ExistingCards from './ExistingCard';
import '../css/app.scss';
import * as CardDataTypes from '../store/Credit-Card-Store';


class App extends React.Component {
  
  public render() {
    return(
      <div className="card-container">
        <h1>Credit Card System</h1>
        <AddCard/>
      </div>
    )
  }
}

export default App;