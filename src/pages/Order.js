import React from 'react';
import '../styles/Order.css'; 
import { useLocation, useParams} from 'react-router-dom';
import Footer from '../components/Footer.js'; 
import OrderForm from '../components/OrderForm.js'; 
import SelectedPizza from '../components/SelectedPizza.js';

function Order() {
  //Home sayfasından seçilen pizza bilgilerini alır
  const location= useLocation();
  //seçilen pizza bilgisi
  const selectedPizza =location.state && location.state.pizzaData;

  return (
    <div className='home2'>
      <div className="baslik10">
        <h1> Teknolojik Yemekler</h1>
      </div > 
      <div className='headerImg'>
      </div>
      <div className='breadscrumb'>
        <p>Anasayfa - Seçenekler - </p>
        <p className='p1'>Sipariş Oluştur</p>
        </div>
      <SelectedPizza pizzaData={selectedPizza}/>
      <OrderForm pizzaData={selectedPizza}/>
      <Footer />
    </div>
  );
}

export default Order;