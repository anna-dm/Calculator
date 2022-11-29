import { priceFormatter, priceFormatterDecimals } from './formatters.js';


// Инпуты

const inputCost = document.querySelector('#input-cost');
const inputDownpayment = document.querySelector('#input-downpayment');
const inputTerm = document.querySelector('#input-term');
const form = document.querySelector('#form');
const totalCost = document.querySelector('#total-cost');
const totalMonthPayment = document.querySelector('#total-month-payment');
// Cleave опции форматирования
const cleavePriceSetting = {
  numeral: true,
  numeralThousandsGroupStyle: 'thousand',
  delimiter: ' '

};




// Запускаем форматирование Cleave
const cleaveCost = new Cleave(inputCost, cleavePriceSetting);
const cleaveDownPayment = new Cleave(inputDownpayment, cleavePriceSetting);

const cleaveTerm = new Cleave(inputTerm, cleavePriceSetting);

//Сумма кредита
calcMortgage();

// Отображение и рассчет суммы кредита
form.addEventListener('input', function () {


  // Сумма кредита
  calcMortgage();
})

function calcMortgage() {
  // Общая сумма кредита
  const totalAmount = +cleaveCost.getRawValue() - cleaveDownPayment.getRawValue();
  totalCost.innerText = priceFormatter.format(totalAmount);




  // Ставка по кредиту
  const creditRate = +document.querySelector('input[name="program"]:checked').value;
  const monthRate = creditRate / 12;




  // Срок ипотеки в месяцах
  const years = +cleaveTerm.getRawValue();
  const months = years * 12;

  // Расчет ежемесячного платежа

  const monthPayment = totalAmount * (monthRate + (monthRate / (((1 + monthRate) ** months) - 1)));
  //Отображение ежемесячного платежа
  totalMonthPayment.innerText = priceFormatterDecimals.format(monthPayment);

}
