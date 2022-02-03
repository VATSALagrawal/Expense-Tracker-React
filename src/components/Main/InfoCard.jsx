import React from 'react';

const randomBool = Math.round(Math.random());

const InfoCard = () => {
  return <div style={{textAlign:'center' , padding:'0 10%'}}>
     Try Saying :
     Add {randomBool ? 'Income ' : 'Expense '} of {randomBool ? '200 ' : '50 '} 
     in Category {randomBool ? 'Business ' : 'Travel '}  for {randomBool ? 'Monday ' : '3 Feburary '}
  </div>;
};

export default InfoCard;
