import {colors, colorsArray, nameColors} from './constants.js'

const filtersDiv = document.querySelector('.nav-filtros');
const redFilter =document.querySelector('.red');
const blueFilter =document.querySelector('.blue');
const greenFilter =document.querySelector('.green');
const yellowFilter =document.querySelector('.yellow');
const aquaFilter =document.querySelector('.aqua');
const violetFilter =document.querySelector('.violet');
const blackFilter =document.querySelector('.black');
const filtersArray = [redFilter,blueFilter,violetFilter,aquaFilter,greenFilter,yellowFilter,blackFilter];

const hexDigits = ['F','E','D','C','B','A','9','8','7','6','5','4','3','2','1','0'];
const backg = document.querySelector('.container');
const spanColor = document.querySelector('.bc-span');

const equivHex = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "A": 10,
    "B": 11,
    "C": 12,
    "D": 13,
    "E": 14,
    "F": 15,
};

export function getHexColor(){
    let hexad = '#'
    for (let index = 0; index < 6; index++) {
        let randomNumber = Math.floor(Math.random() * (hexDigits.length));
        hexad += hexDigits[randomNumber];
    }
    backg.style.backgroundColor = hexad;
    spanColor.textContent = hexad;
    console.log(hexad);
}

export function getDefaultColor(){
    let randomNumber =Math.floor(Math.random() * (colorsArray.length))
    backg.style.backgroundColor = colorsArray[randomNumber];
    spanColor.textContent = nameColors[randomNumber]
}

export function getSearchedColor(){
    const filterNames = ['red','blue','yellow','green','aqua','violet','black'];
    let hexColorFilter;

    //Get the hexCode format by the selectioned filter
    for (let active of filtersArray){
        if (active.classList.contains('filter-active')){
            let colorName = active.classList[1]
            hexColorFilter = colors[colorName];
            break;
        }
    }

    if (hexColorFilter == undefined){ // if any filter is currently active, call the getHexColor()
        getHexColor()
    }else{
        clarifyColor(hexColorFilter)
    }
}
function clarifyColor(hexColorFilter){
    let hexad,intensity,randomNumber,randomNumber2,hexadClarifyY,hexadClarifyX;
    let hexDigits2 =['F','E','D','C','B','A','9','8','7','6','5','4','3','2','1','0']
    let colorArray = hexColorFilter.split('').slice(1); // Convert the selectiones hexCode in a array

    //Count the number of F's 
    let cantF = colorArray.filter(function(valor){
        return valor == 'F'
    }).length
    
    //if it's has 4 F, it's a secondary color
    if (cantF == 4){
        //Clarify in Y
        randomNumber = Math.floor(Math.random() * ((hexDigits2.slice(3).length))); // Until 13 digits
        randomNumber2 = Math.floor(Math.random() * (hexDigits2.length));
        hexadClarifyY = hexColorFilter.replaceAll('FF',`${hexDigits2[randomNumber]+hexDigits2[randomNumber2]}`) //From 3

        //Clarify  in X
        intensity = hexDigits2[randomNumber]
        if (intensity <= 2){
            hexadClarifyX = hexadClarifyY.replaceAll('00',`00`)
            hexad = hexadClarifyX
            backg.style.backgroundColor = hexad;
            spanColor.textContent = hexad;
        }else{
            randomNumber = Math.floor(Math.random() * ((equivHex[intensity] -2) < 0 ? 0 : equivHex[intensity] -2))
            randomNumber2 = Math.floor(Math.random() * (hexDigits.length));
            hexadClarifyX = hexadClarifyY.replace('00',`${hexDigits2.slice(hexDigits2.indexOf(intensity)+3)[randomNumber]+hexDigits2[randomNumber2]}`)
            hexad = hexadClarifyX
            backg.style.backgroundColor = hexad;
            spanColor.textContent = hexad;
        }

    //if it's has 2 F, it's a primary color
    }else if (cantF == 2){
        //Aclarar en Y
        randomNumber = Math.floor(Math.random() * ((hexDigits2.slice(4).length))); //just 12 digits
        randomNumber2 = Math.floor(Math.random() * (hexDigits2.length));
        hexadClarifyY = hexColorFilter.replace('FF',`${hexDigits.reverse().slice(3)[randomNumber]+hexDigits[randomNumber2]}`) // From F to 3

        // Aclarar en X
        intensity = hexDigits.slice(3)[randomNumber] // Get the predominant color intensity
        if (intensity <= 2){
            hexadClarifyX = hexadClarifyY.replaceAll('00',`00`)
            hexad = hexadClarifyX
            backg.style.backgroundColor = hexad;
            spanColor.textContent = hexad;
        }else{
            randomNumber = Math.floor(Math.random() * ((equivHex[intensity] -2) < 0 ? 0 : equivHex[intensity] -2))
            randomNumber2 = Math.floor(Math.random() * (hexDigits.length));

            hexadClarifyX = hexadClarifyY.replaceAll('00',`${hexDigits2.slice(hexDigits2.indexOf(intensity)+3)[randomNumber]+hexDigits2[randomNumber2]}`)
            backg.style.backgroundColor = hexadClarifyX;
            spanColor.textContent = hexadClarifyX;
        }
        


    // If itsn't F's, it's color black/white
    }else if(cantF == 0){
        randomNumber = Math.floor(Math.random() * ((hexDigits.length)));
        randomNumber2 = Math.floor(Math.random() * (hexDigits.length));
        hexad = '#';
        hexad += `${hexDigits[randomNumber]+hexDigits[randomNumber2]}`
        hexad += `${hexDigits[randomNumber]+hexDigits[randomNumber2]}`
        hexad += `${hexDigits[randomNumber]+hexDigits[randomNumber2]}`
        backg.style.backgroundColor = hexad;
        spanColor.textContent = hexad;
    }
}