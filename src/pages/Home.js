import React from "react";
import '../styles/Home.css';
import Footer from '../components/Footer.js';
import { Link } from 'react-router-dom';
import icon1 from '../assets/food-1.png';
import icon2 from '../assets/food-2.png';
import icon3 from '../assets/food-3.png';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const pizzaData = {
    1: { name: 'Terminal Pizza', description: 'A pizza topped with spicy pepperoni slices.', rate: 4.6, commentNumbers: "(100)", price: 75.50 },
    2: { name: 'Position Absolute Acı Pizza', description: 'Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir.', rate: 4.9, commentNumbers: "(200)", price: 85.50 },
  };
  const handleButtonClick = (value) => {
    navigate("/siparis", {
      state: { pizzaData: pizzaData[value] }
    }
    );
  };

  return (
    <div className="home">
      <div className='headerImgs'>
        <div className="homeBaslik">
          <div className="baslik">
            <h1> Teknolojik Yemekler</h1>
          </div>
          <div className="baslik2">
            <p className="yellowLabel">
              fırsatı kaçırma
            </p>
            <p className="secondLabel">
              KOD ACIKTIRIR
            </p>
            <p className="thirdLabel">
              PİZZA, DOYURUR
            </p>
          </div>
        </div>
        <div className="homeButton">
          <Link className="order-button">ACIKTIM </Link>
        </div>
      </div>
      <div className="foodMenus">
        <button className="foodButton" onClick={() => handleButtonClick('1')}><img src={icon1} height='200px' width='200px' /></button>
        <button className="foodButton" onClick={() => handleButtonClick('2')}><img src={icon2} height='200px' width='200px' /> </button>
        <button className="foodButton"><img src={icon3} height='200px' width='200px' /></button>
      </div>
      <div>
        <Footer /></div>
    </div>
  );
};
export default Home;