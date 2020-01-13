import React from 'react';
import axios from 'axios';


const baseUrl="http://localhost:8080/api/creditcards";

export function getDetails(callback:any) {
  axios.get(baseUrl)
  .then((response)=>{
      callback(response);
  })
  .catch((error)=>{
    callback(error);
  })
}

export function saveDetails(details:any,callback:any) {
  axios.post(baseUrl, JSON.stringify(details),{
    headers:{'Content-Type': 'application/json;charset=UTF-8'}
  })
  .then((response)=>{
      callback(response);
  })
  .catch((error)=>{
    callback(error);
  })
}