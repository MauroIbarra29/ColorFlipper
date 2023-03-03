import {colors, colorsArray, nameColors} from './constantes.js'

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

    //Obtengo en formato hexCode el codigo del filtro elegido
    for (let active of filtersArray){
        if (active.classList.contains('filter-active')){
            let colorName = active.classList[1]
            hexColorFilter = colors[colorName];
            break;
        }
    }

    if (hexColorFilter == undefined){ // Si no le activo un filtro, corre el codigo hexadecimal
        getHexColor()
    }else{
        aclararColor(hexColorFilter)
    }
}

function aclararColor(hexColorFilter){
    let hexad ;
    let colorArray = hexColorFilter.split('').slice(1); // Convierto el codigo a array

    //Cuento la cantidad de F
    let cantF = colorArray.filter(function(valor){
        return valor == 'F'
    }).length
    
    //Si tiene 4 es un color secundario
    if (cantF == 4){
        let randomNumber = Math.floor(Math.random() * ((hexDigits.length)));
        let randomNumber2 = Math.floor(Math.random() * (hexDigits.length));
        hexad = hexColorFilter.replaceAll('FF',`${hexDigits[randomNumber]+hexDigits[randomNumber2]}`)
        backg.style.backgroundColor = hexad;
        spanColor.textContent = hexad;

    //Si tiene 2 es un color primario
    }else if (cantF == 2){ 
        //Aclarar en Y
        let randomNumber = Math.floor(Math.random() * ((hexDigits.length)));
        let randomNumber2 = Math.floor(Math.random() * (hexDigits.length));
  
        hexColorFilter.replace('FF',`${hexDigits[randomNumber]+hexDigits[randomNumber2]}`)
        //Aclarar en X
        randomNumber = Math.floor(Math.random() * ((hexDigits.slice(4).length)));
        randomNumber2 = Math.floor(Math.random() * (hexDigits.length));
        hexad = hexColorFilter.replaceAll('00',`${hexDigits.slice(3)[randomNumber]+hexDigits[randomNumber2]}`)
        backg.style.backgroundColor = hexad;
        spanColor.textContent = hexad;

    // Si no tiene es color negro
    }else if(cantF == 0){
        let randomNumber = Math.floor(Math.random() * ((hexDigits.length)));
        let randomNumber2 = Math.floor(Math.random() * (hexDigits.length));

        hexad += `${hexDigits[randomNumber]+hexDigits[randomNumber2]}`
        hexad += `${hexDigits[randomNumber]+hexDigits[randomNumber2]}`
        hexad += `${hexDigits[randomNumber]+hexDigits[randomNumber2]}`
        
        backg.style.backgroundColor = hexad;
        spanColor.textContent = hexad;
    }
}