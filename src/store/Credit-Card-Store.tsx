export interface ICardTypeProps{
  cardNumber:string;
  cardName:string;
  cardLimit:number;
  cardNameValid: boolean,
  cardNumberValid: boolean,
  formValid:boolean,
  formErrors:{},
  existingCardRef:any
}

export interface ICardTypeState{
  id:number,
  cardNumber:string;
  cardName:string;
  cardLimit:number;
  cardNameValid: boolean,
  cardNumberValid: boolean,
  formValid:boolean,
  formErrors:{}       
}

export interface IExistingCards{
  existingCards:ICardTypeState[];
}

export interface IExistingCardsProps{
  name:string;
}





