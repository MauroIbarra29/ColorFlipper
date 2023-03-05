import { getHexColor, getDefaultColor, getSearchedColor} from "./getColors.js";

//Boton 'Click Me' , fondo y texto
const btnClickMe = document.querySelector('.bc-button');
const backg = document.querySelector('.container');
const spanColor = document.querySelector('.bc-span');


//Main variables
const simpleButton = document.querySelector('.simple-title');
const hexButton = document.querySelector('.hex-title');
const searchButton = document.querySelector('.search-title');

// //Search filter variables
const filtersDiv = document.querySelector('.nav-filters');
const redFilter =document.querySelector('.red');
const blueFilter =document.querySelector('.blue');
const greenFilter =document.querySelector('.green');
const yellowFilter =document.querySelector('.yellow');
const lightblueFilter =document.querySelector('.aqua');
const violetFilter =document.querySelector('.violet');
const blackFilter =document.querySelector('.black');
const filtersArray = [redFilter,blueFilter,violetFilter,lightblueFilter,greenFilter,yellowFilter,blackFilter];


function getUnderLine(e){

    for (let button of [simpleButton,hexButton,searchButton]){
        if(button.classList.contains('is-title-active')){
            button.classList.toggle('is-title-active');
            break;

        }
    }
    e.target.classList.toggle('is-title-active');
}
function checkFilters(){
    const filters = document.querySelector('.nav-filters');
    const nav = document.querySelector('nav');
    if(searchButton.classList.contains('is-title-active')){
        filters.style.visibility='visible';
        nav.style.display='flex';
        nav.style.height='auto';

    }else{
        filters.style.visibility='hidden';
        nav.style.display='block';
        nav.style.height='60px';
    }
}


//Default Event
btnClickMe.addEventListener('click',getDefaultColor)

//Activate filters by event delegation to the parent node
filtersDiv.addEventListener('click',function(e){
        if (e.target.classList.contains('filter') || e.target.tagName == 'H3'){ // If I click on the filter or its children
            let target = e.target
            if (e.target.tagName == 'H3'){
                target = e.target.parentNode; //If I click on the child, return me to the parent
            }
            if (target.classList.contains('filter-active')){ //If I click on a filter that is already active, I desactivate it
                target.classList.toggle('filter-active');
            }else{
                for (let filter of filtersArray){ //Disable active filters
                    if(filter.classList.contains("filter-active")){
                        filter.classList.toggle('filter-active');
                    }
                }
                target.classList.toggle('filter-active');
            }
            
    }
});
//Add events to nav elements
hexButton.addEventListener('click', (e)=>{
    getUnderLine(e),
    checkFilters(),
    btnClickMe.removeEventListener('click',getDefaultColor),
    btnClickMe.addEventListener('click',getHexColor);

});

simpleButton.addEventListener('click', (e)=>{
    getUnderLine(e),
    checkFilters(),
    btnClickMe.removeEventListener('click',getHexColor),
    btnClickMe.addEventListener('click',getDefaultColor);
});
searchButton.addEventListener('click', (e)=>{
    getUnderLine(e),
    checkFilters(),
    btnClickMe.removeEventListener('click',getHexColor)
    btnClickMe.removeEventListener('click',getDefaultColor)
    btnClickMe.addEventListener('click',getSearchedColor);

});

