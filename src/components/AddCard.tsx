import React from 'react';
import * as CardDataTypes from '../store/Credit-Card-Store';
import '../css/addCard.scss';
import * as dataServices from '../store/DataServicesStore';
import Luhn from './Luhn';
import { FormErrors } from './FormErrors';
import ExistingCards from './ExistingCard';

class Card extends React.Component<{},CardDataTypes.ICardTypeState>
{
  private existingCardRef = React.createRef<ExistingCards>();
  constructor(props:CardDataTypes.ICardTypeProps){
      super(props);
      this.state = {
        id:0,
        cardName: '',
        cardNumber: '',
        cardLimit:100000,
        formErrors: {cardName: '', cardNumber: ''},
        cardNameValid: false,
        cardNumberValid: false,
        formValid: false,
      };
  }

  onSaveCardDetailsHandler = (event:any) => {
      event.preventDefault();

      dataServices.saveDetails(this.state,(response:any)=>{
          if(response.status==201){  
            alert('Successfully Saved!');
            this.existingCardRef.current?.getCards(); //Mounting comopnent
          } 
          else alert("Error : "+response);
      })
  }

  onCardDetailsInputHandler = (event:any) =>
  {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name] :value} as CardDataTypes.ICardTypeState,
        () => this.validateField(name, value))
  }

  validateField(fieldName:any, value:any) {
    let fieldValidationErrors = this.state.formErrors;
    let cardNameValid = this.state.cardNameValid;
    let cardNumberValid = this.state.cardNumberValid;
    switch(fieldName) {
      case 'cardName':
        cardNameValid = value.length >= 2;
        // alert(cardNameValid ? '' : ' is invalid');
        fieldValidationErrors = cardNameValid ? '' : ' Please Enter Name';
        console.log(fieldValidationErrors);
        break;
      case 'cardNumber':
        cardNumberValid = Luhn.valid(value);
        // alert(cardNumberValid ? '': ' is too short');
        fieldValidationErrors = cardNumberValid ? '' : 'Card number is invalid';
        console.log(fieldValidationErrors);
        break;
      default:
        break;
    }

    this.setState({formErrors: fieldValidationErrors,
      cardNameValid: cardNameValid,
      cardNumberValid: cardNumberValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.cardNameValid && this.state.cardNumberValid});
  }

  public render(){
    return(
      <React.Fragment>
      <form className="card-form">
        <h2>Add</h2>
        <div className="form-error">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className="card-form__group">
          <label>Name</label>
          <br/>
          <input className="card-form__group--input" name="cardName" id="name" 
          value={this.state.cardName} onChange={this.onCardDetailsInputHandler}></input>
        </div>
        <div className="card-form__group">
          <label>Card Number</label>
          <br/>
          <input className="card-form__group--input" name="cardNumber" id="number" maxLength={16}
          value={this.state.cardNumber} onChange={this.onCardDetailsInputHandler}></input>
        </div>
        <div className="card-form__group">
          <label>Limit</label>
          <br/>
          <input className="card-form__group--input" name="cardLimit"
           id="limit" value={this.state.cardLimit} onChange={this.onCardDetailsInputHandler}>
           </input>
        </div>
        <div className="card-form__group">
          <button type="submit" className="card-form__btn" disabled={!this.state.formValid} 
          onClick={this.onSaveCardDetailsHandler}>Add</button>
        </div>
      </form>
      <ExistingCards ref={this.existingCardRef}/>
      </React.Fragment>
    )
  }
}

export default Card;