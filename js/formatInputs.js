import { priceFormatter } from './formatters.js';


// Инпуты

const inputCost = document.querySelector('#input-cost');
const inputDownpayment = document.querySelector('#input-downpayment');
const inputTerm = document.querySelector('#input-term');
const form = document.querySelector('#form');
const totalCost = document.querySelector('#total-cost');

// Cleave опции форматирования
const cleavePriceSetting = {
  numeral: true,
  numeralThousandsGroupStyle: 'thousand',
  delimiter: ' '

};



// Запускаем форматирование Cleave
const cleaveCost = new Cleave(inputCost, cleavePriceSetting);
const cleaveDownPayment = new Cleave(inputDownpayment, cleavePriceSetting);

//Сумма кредита
calcMortgage();

// Отображение и рассчет суммы кредита
form.addEventListener('input', function () {


  // Сумма кредита
  calcMortgage();
})

function calcMortgage() {
  const totalAmount = +cleaveCost.getRawValue() - cleaveDownPayment.getRawValue();
  totalCost.innerText = priceFormatter.format(totalAmount);
}



