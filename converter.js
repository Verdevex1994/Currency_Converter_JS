// Wait for the dom to load before doing anything
document.addEventListener('DOMContentLoaded', function() {

  // Grab some page elements to work with
  let amountbox = document.getElementById("amount");
  let rateselect = document.getElementById("rate");
  let result = document.getElementById("converted");

  // Listen to change events on the text input and select
  document.getElementById("amount").addEventListener("input", calculate);
  document.getElementById("rate").addEventListener("change", calculate);

  // Grab Live Rates from XMLHttpRequest and populate select field
  function reqListener() {

    var data = JSON.parse(this.responseText);

    if (this.status >= 200 && this.status < 400) {
      console.log(data);

      let rates = Object.entries(data.rates);
      rates.forEach(([currency, rate], i) => {
        var option = document.createElement("option");
        option.value = rate;
        option.text = currency;
        rateselect.appendChild(option);
      });

    } else {
      console.log("We connected to the server, but it returned an error.");
    }
  }

  function reqError(err) {
    console.log('Fetch Error :', err);
  }




  var oReq = new XMLHttpRequest();
  oReq.onload = reqListener;
  oReq.onerror = reqError;
  oReq.open('get', 'https://api.exchangeratesapi.io/latest?base=GBP', true);
  oReq.send();



  // Work out the result
  function sum(amount, rate) {
    if (rate == "select") {
      result.setAttribute("placeholder", "Please Select Currency");
    } else {
      result.value = (amount * rate).toFixed(2);
    }
  }

  // Do the sum on input or select change
  function calculate() {
    sum(amountbox.value, rateselect.value);
  }
});
