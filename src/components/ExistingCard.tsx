import React from 'react';
import '../css/existingCard.scss';
import * as CardDataTypes from '../store/Credit-Card-Store';
import * as DataServices from '../store/DataServicesStore'

class ExistingCards extends React.Component<{}, CardDataTypes.IExistingCards>
{
  constructor(props:CardDataTypes.IExistingCardsProps){
    super(props);
    this.state = {
      existingCards:[]
    }
  }

  public getCards = () =>{
    DataServices.getDetails((response:any)=>{
      console.log(response);
        this.setState({existingCards:response.data})
    })
  }

  componentDidMount(){this.getCards();}

  public render(){
    const{existingCards} = this.state;
    return (
    <React.Fragment>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Card Number</th>
          <th>Limit</th>
        </tr>
        </thead>
        <tbody>
          {existingCards.length > 0 
          ? existingCards.map((card)=>{return <tr key={card.id}> 
          <td>{card.cardName}</td>
          <td>{card.cardNumber}</td>
          <td>{card.cardLimit}</td>
          </tr>}): <tr><td colSpan={3}>No records found</td></tr>}
        </tbody>
      </table>
    </React.Fragment>
    )
  }
}

export default ExistingCards;