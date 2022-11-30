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

// Slider Cost

const sliderCost = document.getElementById('slider-cost');

noUiSlider.create(sliderCost, {
  start: 12000000,
  connect: 'lower',
  tooltips: true,
  step: 100000,
  range: {
    'min': 0,
    '50%': [10000000, 1000000],
    'max': 100000000,
  },

  format: wNumb({
    decimals: 0,
    thousand: ' ',
    suffix: '',
  })
});


sliderCost.noUiSlider.on('update', function () {
  const sliderValue = parseInt(sliderCost.noUiSlider.get(true));
  cleaveCost.setRawValue(sliderValue);
  calcMortgage();
});


// Slider DownPayment

const sliderDownpayment = document.getElementById('slider-downpayment');

noUiSlider.create(sliderDownpayment, {
  start: 6000000,
  connect: 'lower',
  tooltips: true,
  step: 100000,
  range: {
    'min': 0,
    '50%': [10000000, 1000000],
    'max': 100000000,
  },

  format: wNumb({
    decimals: 0,
    thousand: ' ',
    suffix: '',
  })
});


sliderDownpayment.noUiSlider.on('update', function () {
  const sliderValue = parseInt(sliderDownpayment.noUiSlider.get(true));
  cleaveDownPayment.setRawValue(sliderValue);
  calcMortgage();
});


// Slider Years

const sliderTerm = document.getElementById('slider-term');

noUiSlider.create(sliderTerm, {
  start: 1,
  connect: 'lower',
  tooltips: true,
  step: 1,
  range: {
    'min': 1,
    'max': 30,
  },

  format: wNumb({
    decimals: 0,
    thousand: ' ',
    suffix: '',
  })
});


sliderTerm.noUiSlider.on('update', function () {
  const sliderValue = parseInt(sliderTerm.noUiSlider.get(true));
  cleaveTerm.setRawValue(sliderValue);
  calcMortgage();
});

// Форматирование inputCost

inputCost.addEventListener('input', function () {
  const value = +cleaveCost.getRawValue();
  if (value > 100000000) {
    inputCost.closest('.param__details').classList.add('.param__details--error');
  }

  if (value <= 100000000) {
    inputCost.closest('.param__details').classList.remove('.param__details--error');
  }
})
