import React from "react";
import { useLocation } from "react-router-dom";
import '../styles/Success.css';

const Success = () => {
  const route = useLocation();
  //debugger;
 //seçilen pizza, hamur tipi vs bilgiler çekilir
  const { pizzaData, pizzaType, doughType, selectedIngredients, selectedItemPrice, totalPrice } = route.state;
  //debugger
  //ekstra seçilen ürünler , ile birleştirildi
  const stringIngredients = selectedIngredients.join(',');
  console.log("Pizza: " + pizzaData.name, " Hamur tipi: "+ doughType + " Boyut: "+ pizzaType + " Seçilen ekstra malzemeler: " +stringIngredients
  + " Ekstra ürün fiyat: "+selectedItemPrice +" Toplam fiyat: "+ totalPrice);

  return (
    <div className="success">
      <div className="baslik3">
        <h1> Teknolojik Yemekler</h1>
      </div>
      <div className="baslik4">
        <p className="baslik5">
          lezzetin yolda
        </p>
        <p className="baslik6">
          SİPARİŞ ALINDI
        </p>
        <hr className="line"></hr>
      </div>
      <div className="pizza-name">
        <p>
          {pizzaData.name}
        </p>
      </div>
      <div className="PizzaOrder">
        <div className="PizzaDetail">
          <p>Boyut: <strong>{pizzaType}</strong>
          </p>
          <p> Hamur: <strong>{doughType}</strong>
          </p>
          <p>Ek Malzemeler: <strong>{stringIngredients}</strong>
          </p>
        </div>
      </div>
      <div className="PizzaFeeInfo">
        <div className="PizzaFeeInfoDetail">
          <p> <strong>Sipariş Toplamı </strong>
          </p>
          <p> <strong>Seçimler: {selectedItemPrice}₺</strong>
          </p>
          <p> <strong>Toplam: {totalPrice}₺</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Success;