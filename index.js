import { getHexColor, getDefaultColor, getSearchedColor, myStorage} from "./getColors.js";
import {colors} from "./constants.js";

//Boton 'Click Me' , fondo y texto
const btnClickMe = document.querySelector('.bc-button');
const backg = document.querySelector('.container');
const spanColor = document.querySelector('.bc-span');


//Main variables from nav
const simpleButton = document.querySelector('.simple-title');
const hexButton = document.querySelector('.hex-title');
const searchButton = document.querySelector('.search-title');

//Search filter variables
const filtersDiv = document.querySelector('.nav-filters');
const redFilter =document.querySelector('.red');
const blueFilter =document.querySelector('.blue');
const greenFilter =document.querySelector('.green');
const yellowFilter =document.querySelector('.yellow');
const lightblueFilter =document.querySelector('.aqua');
const violetFilter =document.querySelector('.violet');
const blackFilter =document.querySelector('.black');
const filtersArray = [redFilter,blueFilter,violetFilter,lightblueFilter,greenFilter,yellowFilter,blackFilter];

//Save colors
const saveButton = document.querySelector('.save-button');
const divAsideContainer = document.querySelector('.aside-container');
let savedColors = []

function saveColor(){
    let textToCopy = spanColor.textContent //color to be save
    console.log(textToCopy);
    //if the color doesn`t exist in the save colors library
    if(!savedColors.includes(textToCopy)){
        savedColors = myStorage.getItem('saveColor').split(',')
        
        if(savedColors.includes('')){ //If there  aren`t save colors 
            savedColors.pop()
            savedColors.push(textToCopy)
        }else{  // if there are save colors
            savedColors.push(textToCopy)
        }
        //add to the save colors
        let divColorSaved = document.createElement('DIV')
        divColorSaved.classList.add('color-saved')
        divColorSaved.style.backgroundColor = `${textToCopy}`
 
        let cruzIcon = document.createElement('I')
        cruzIcon.classList.add('fa-regular')
        cruzIcon.classList.add('fa-circle-xmark')
        cruzIcon.classList.add('color-saved-cruz')
 
        divColorSaved.appendChild(cruzIcon);
        divAsideContainer.appendChild(divColorSaved);
        myStorage.setItem(`saveColor`,savedColors)
        
    }   
}

async function handleSaveColor(e){
    let target= e.target;

    // if i click in the cruz icon, remove the element and pop the color from the savedColors array
    if(e.target.classList.contains('color-saved-cruz')){
        let savedColors = myStorage.getItem('saveColor').split(',')

        target =e.target.parentNode
        
        divAsideContainer.removeChild(target)
        savedColors.splice(savedColors.indexOf(target.style.backgroundColor),1)
        myStorage.setItem('saveColor',savedColors)
    }else{
        //copy the color
        await navigator.clipboard.writeText(target.style.backgroundColor);
    }

}

async function copyCodeSpan(){
    let textToCopy = spanColor.textContent
    try{
        let previuosCopyClipboard = await navigator.clipboard.readText();

        // if the hexCode it's has been copied before, dont do anything
        if(previuosCopyClipboard == textToCopy){
    
        }else{
            //Copy the color and add a modal window
            await navigator.clipboard.writeText(textToCopy);
            let modalCopy =document.createElement('DIV')
            modalCopy.innerHTML = 'Copied to the Clipboard!'
            modalCopy.classList.add('modal-copy-active')
            spanColor.classList.toggle('modal-copy-already')
            
            spanColor.appendChild(modalCopy)
            setTimeout(()=>{
                spanColor.removeChild(modalCopy)
            },1000)
        }
        


    }catch(err){
        console.log('No se ha podido copiar al portapapeles: ',err);
    }
}
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
window.addEventListener('DOMContentLoaded',()=>{
    let previousBackground;
    if(myStorage.getItem('bg') == null || myStorage.getItem('bg') == ''){
        console.log('No hay fondo guardado previamente');
        myStorage.setItem('bg','#d4e8ee')
    }
    previousBackground = myStorage.getItem('bg')
    backg.style.backgroundColor = previousBackground;
    spanColor.textContent = previousBackground;

    if(myStorage.getItem('saveColor') == '' || myStorage.getItem('saveColor') == null){
        console.log('No hay colores previos guardados');
    }else{
        let colorsInStorage = myStorage.getItem('saveColor').split(',')
        for (let color of colorsInStorage){
            let divColorSaved = document.createElement('DIV')
            let cruzIcon = document.createElement('I')

            divColorSaved.classList.add('color-saved')
            divColorSaved.style.backgroundColor = `${color}`
            cruzIcon.classList.add('fa-regular')
            cruzIcon.classList.add('fa-circle-xmark')
            cruzIcon.classList.add('color-saved-cruz')
            
            divColorSaved.appendChild(cruzIcon);
            divAsideContainer.appendChild(divColorSaved);
        }
    }
})

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

//Copy hexCode
spanColor.addEventListener('click',copyCodeSpan);
divAsideContainer.addEventListener('click',handleSaveColor)
//Save colors
saveButton.addEventListener('click',saveColor)