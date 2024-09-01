
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for(let select of dropdown){
    for(currCode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currCode;
        newoption.value = currCode;
        if(select.name==="from" && currCode==="USD"){
            newoption.selected = "selected";
        }else if(select.name === "to" && currCode==="INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal = 1;
        amount.value ="1";
    }
    const URL = `https://v6.exchangerate-api.com/v6/977a8d486562b286c8ec6843/latest/${fromCurrency.value}`;
    let response = await fetch(URL);
    let data = await response.json();

    let exchangeRate = data.conversion_rates[toCurrency.value]
    let finalExchangeRate = amtVal * exchangeRate;
    msg.innerText = `${amtVal} ${fromCurrency.value} = ${finalExchangeRate} ${toCurrency.value}`

}



const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
})









