import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTwitter } from "react-icons/fa";
import '../styles/Footer.css';
import icon1 from '../assets/icon-1.png';
import icon2 from '../assets/icon-2.png';
import icon3 from '../assets/icon-3.png';
import li0 from '../assets/li-0.png';
import li1 from '../assets/li-1.png';
import li2 from '../assets/li-2.png';
import li3 from '../assets/li-3.png';
import li4 from '../assets/li-4.png';
import li5 from '../assets/li-5.png';

function Footer() {
  const [posts, setPosts] = useState([]);
  //axios ile örnek bir email adresi çekildi
  useEffect(() => {
    axios
      .get("https://reqres.in/api/users?per_page=20")
      .then((res) => {
        //debugger;
        setPosts(res.data.data);
      })
      .catch((err) => {
        console.error(err.response);
      });
  }, []);

  const user = posts.find(
    (user) =>
      user.id === 2
  );
  const email = user != null ? user.email : "";

  return (
    <div className="columns">
      <div className="firstColumns">
        <div className="column">
          <div className='column1'>
            <h3>Teknolojik Yemekler</h3>
            <p><img src={icon1} height='20px' width='20px' /> 341 Londonderry Road, Istanbul Türkiye</p>
            <p><img src={icon2} height='20px' width='20px' /> {email}</p>
            <p><img src={icon3} height='20px' width='20px' /> +90 216 123 45 67</p>
          </div>
        </div>
        <div className="column">
          <h3>Hot Menu</h3>
          <p>Terminal Pizza</p>
          <p>5 Kişilik Hackathlon Pizza</p>
          <p>useEffect Tavuklu Pizza</p>
          <p>Beyaz Console Frosty</p>
          <p>Testler Geçti Mutlu Burger</p>
          <p>Position Absolute Acı Burger</p>
        </div>
        <div className="column">
          <h3>Instagram</h3>
          <div className='firstRowPicture'>
            <img src={li0} className="photo" />
            <img src={li1} className="photo" />
            <img src={li2} className="photo" />
          </div>
          <div className='secondRowPicture'>
            <img src={li3} className="photo" />
            <img src={li4} className="photo" />
            <img src={li5} className="photo" />
          </div>
        </div>
      </div>
      <hr className="line"></hr>
      <div className="secondColumns">
        <div className='column2'>
          <p>© 2023 Teknolojik Yemekler.</p>
        </div>
        <div className='column2'>
          <p className='twitterIcon'>
            <FaTwitter /></p>
        </div>
      </div>
    </div>
  );
}

export default Footer;