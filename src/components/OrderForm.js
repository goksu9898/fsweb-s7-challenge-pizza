import React, { useState } from 'react';
import * as yup from 'yup';
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import '../styles/OrderForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//ekstra malzemeler
const pizzaIngredients = [
  { id: 1, name: 'Pepperoni' },
  { id: 2, name: 'Domates' },
  { id: 3, name: 'Biber' },
  { id: 4, name: 'Sosis' },
  { id: 5, name: 'Mısır' },
  { id: 6, name: 'Sucuk' },
  { id: 7, name: 'Kanada Jambonu' },
  { id: 8, name: 'Sucuk' },
  { id: 9, name: 'Ananas' },
  { id: 10, name: 'Tavuk Izgara' },
  { id: 11, name: 'Jalepeno' },
  { id: 12, name: 'Kabak' },
  { id: 13, name: 'Soğan' },
  { id: 14, name: 'Sarımsak' },
];
//seçildiğindeki değeri,ekranda görünen isim
const options = [
  { value: 'İnce Kenar', label: 'İnce Kenar' },
  { value: 'Normal Kenar', label: 'Normal Kenar' },
  { value: 'Kalın Kenar', label: 'Kalın Kenar' }
]

const ingredientsPerGroup = 3;
//yup validation 
const validationSchema = yup.object().shape({
  selectedIngredients: yup
    .array()
    .of(yup.number())
    .max(10, 'En fazla 10 malzeme seçebilirsiniz'),
  sizeType: yup.string().required('Boyut seçimi yapmalısınız'),
  selectedDough: yup.string().required('Hamur kalınlığı seçmelisiniz'),
});

const OrderForm = ({ pizzaData }) => {
  const navigate = useNavigate();

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedIngredientNames, setSelectedIngredientNames] = useState([]);
  const [errors, setErrors] = useState({});
  const [sizeType, setClickedButtonValue] = useState(null);
  const [selectedDough, setSelectedDough] = useState(null);
  const [totalPriceSelectedIngredients, setSelectedIngredientsPrice] = useState(0);

  //checkbox seçme-silme
  const handleCheckboxChange = (ingredientId, ingredientName) => {
    //içinde varsa sil
    if (selectedIngredients.includes(ingredientId)) {
      setSelectedIngredients(selectedIngredients.filter((id) => id !== ingredientId));
      setSelectedIngredientsPrice(5 * (selectedIngredients.length - 1));
      setSelectedIngredientNames(selectedIngredientNames.filter((name) => name !== ingredientName));

    } else {
      if (selectedIngredients.length < 10) {
        setSelectedIngredients([...selectedIngredients, ingredientId]);
        setSelectedIngredientsPrice(5 * (selectedIngredients.length + 1));
        setSelectedIngredientNames([...selectedIngredientNames, ingredientName]);

      } else {
        setErrors({ selectedIngredients: 'En fazla 10 malzeme seçebilirsiniz.' });
      }
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};
  //validasyon kontrol
    try {
      validationSchema.validateSync({ selectedIngredients, sizeType, selectedDough }, { abortEarly: false });
    } catch (validationError) {
      validationError.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      });
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      //debugger;
      //success sayfasına ekranda gösterilecek bilgiler gönderilir
      navigate("/success", {
        state: {
          pizzaData: pizzaData, pizzaType: sizeType, doughType: selectedDough, selectedIngredients: selectedIngredientNames,
          selectedItemPrice: totalPriceSelectedIngredients, totalPrice: totalPriceSelectedIngredients + pizzaData.price
        }
      }
      );
    }
  };

  const handleButtonClick = (value) => {
    setClickedButtonValue(value);
  };

  //checkbox bilgileri 3 grup halinde gösterilir
  const groupIngredients = () => {
    const groups = [];
    for (let i = 0; i < pizzaIngredients.length; i += ingredientsPerGroup) {
      groups.push(pizzaIngredients.slice(i, i + ingredientsPerGroup));
    }
    return groups;
  };

  return (
    <div className='form'>
      <div className='pizzaSelect'>
        <div className='choseeSize'>
          <p>Boyut Seç</p>
          <p className='validation'>*</p>
        </div> <div className='choseeType'>
          <p>Hamur Seç</p>
          <p className='validation'>*</p>
        </div>
      </div>
      <div className="">
        <div className="left-column">
          <button id={"S"} className={sizeType === "S" ? "chosen-button" : "rounded-button"} onClick={() => handleButtonClick('S')}>S</button>
          <button id={"M"} className={sizeType === "M" ? "chosen-button" : "rounded-button"} onClick={() => handleButtonClick('M')}>M</button>
          <button id={"L"} className={sizeType === "L" ? "chosen-button" : "rounded-button"} onClick={() => handleButtonClick('L')}>L</button>
        </div>
        <div className="right-column">
          <div className="left-column2">
            <Select id = "size-dropdown"options={options} placeholder="--Hamur Kalınlığı Seç--" value={options.find((option) => option.value === selectedDough)}
            onChange={(selectedOption) => setSelectedDough(selectedOption.value)} /></div>
          <div></div>

        </div>
      </div>
      <p className="ekMalzemeler"><strong>Ek Malzemeler</strong></p>
      <p className='ekMalzemeAcıklama'>En Fazla 10 malzeme seçebilirsiniz. 5₺</p>
      
      <form id= "pizza-form" onSubmit={handleFormSubmit} >
        <div className="checkbox-groups">
          {groupIngredients().map((group, groupIndex) => (
            <div key={groupIndex} className="group">
              {group.map((ingredient) => (
                <div key={ingredient.id} className="column">
                  <label>
                    <input
                      type="checkbox"
                      name="selectedIngredients"
                      value={ingredient.id}
                      onChange={() => handleCheckboxChange(ingredient.id, ingredient.name)}
                      checked={selectedIngredients.includes(ingredient.id)}
                    />
                    {ingredient.name}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
        {errors.selectedIngredients && <p className="error-message">{errors.selectedIngredients}</p>}
        {/* {errors.sizeType && <p className="error-message">{errors.sizeType}</p>}
        {errors.selectedDough && <p className="error-message">{errors.selectedDough}</p>} */}
        <div className='orderNote'> <p>Sipariş Notu</p>
          <div className='orderInput'>
            <input id= "special-text" className='input' type='text' placeholder='Siparişine eklemek istediğin bir not var mı?' >
            </input>
          </div>
          <hr className="line"></hr>
        </div>
        <div className='container'>
          <p><strong>Sipariş Toplamı</strong></p>
          <div className='priceInfo'>
            <p>Seçimler</p>
            <p className='price'>{totalPriceSelectedIngredients}.00₺</p>
          </div>
          <div className='priceInfo2'>
            <p>Toplam</p>
            <p className='price2'>{totalPriceSelectedIngredients + pizzaData.price}₺</p>
          </div>
          <button id="order-button" type="submit"><strong>SİPARİŞ VER</strong></button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default OrderForm;