import React from 'react';
import '../styles/SelectedPizza.css';
//seçilen ürünün bilgisinin (fiyat,açıklama,isim,oy bilgisi..) gösterildiği component
//bir önceki sayfadan seçilen pizzaData
function SelectedPizza({ pizzaData }) {
  return (
    <div className='pizzaInfo'>
      <p className='pizzaName'><strong>{pizzaData.name}</strong></p>
      <div className='pizzaPriceRate'>
        <p><strong>{pizzaData.price}₺</strong></p>
        <div className='pizzaPriceRate2'>
          <p>{pizzaData.rate}</p>
          <p>{pizzaData.commentNumbers}</p></div>
      </div>
      <p className='description'>{pizzaData.description}</p>
    </div>
  );
}

export default SelectedPizza;