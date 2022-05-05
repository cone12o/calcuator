'use strict';
//Let's select all the element we  will use ......
//we will work with 2 screens,4 symbols,10numbers,1 clear button,
let screen0El=document.querySelector(".screen0");
let screen1El=document.querySelector(".screen1");
let symoblsEl=document.querySelectorAll(".calculator-symbol");
let numbersEl=document.querySelectorAll(".calculator-number");
let clearEl=document.querySelectorAll(".calculator-clear");

//first of all: if we start to work with calculator 2 action can be: clicking or calculating
//so it would be clicked or calculated if we make an action 

let clicked=false;
let calculated=false;

// to make a dry code to do not repeat our self lets create 1 function that we will call to tell if the action is clicked 

function buttonClicked(){
    for(let i=0;i<symoblsEl.length;i++){
        if(symoblsEl[i].classList.contains("button--selected")){
            symoblsEl[i].classList.remove("button--selected");
        }
    }
}
////When i write the html code all the button i made in a div with a class "calculator"
//so lets add eventListener to all butons when i click them and function what will happen if i click them.

document.querySelector(".calculator").addEventListener("click",(x)=>{
    //when we click we click a number ,symbol,clear button so the x will be the target
    let valueEl=x.target.innerHTML;
    console.log(valueEl);
    //if i see in the console the value will be whatever button i click.
    //But everytime i click a button i should make a code to tell if the calculated happen
    //so lets create a function for a dry code.//thats the reason why the function is gonna be created inside /////the addevent listener 
    function isCalculated(){
        if(calculated){
            //if the calculating it is not happening the screen will be taking the values untill u click a symbol
            //for calculating procces//so when the calculating process is not happening //when ur clickin a ///////number or dot
            if(x.target.webkitMatchesSelector(".calculator-number") || x.target.webkitMatchesSelector(".calculator-Dot")){
                screen0El.innerHTML = "";
                screen1El.innerHTML = "";
                calculated=false;
            }else if(x.target.webkitMatchesSelector(".calculator-symbol")){
                screen0El.innerHTML="";
                calculated=false;
            }else{//if i click the clear button
                screen0.innerHTML="";
                calculated=false;///so there was 3 option when i click:number or dot,symbol or else clear button
            }
        }
    }
//if i click a number
if(x.target.webkitMatchesSelector(".calculator-number")){
    isCalculated();
    //first we add the number a the screen
    screen1El.innerHTML += valueEl;
    buttonClicked();
}else if(x.target.webkitMatchesSelector(".calculator-symbol")){
    //if i click a symbol what wil happen some method i got from google there watching different calculators
    isCalculated();
    if(screen1El.innerHTML){
        buttonClicked();
        x.srcElement.classList.add("button--selected");
        //the number that is in the screen above will go in the screen up
        screen0El.innerHTML += screen1El.innerHTML + valueEl;
        //than screen again empty
        screen1El.innerHTML = "";

        //////////////////////////////////////////////////////////////
        //i COPY TAHT METHOD
        /////////////////////////////////////////////////////////
        let lastValue = [screen0El.innerHTML.slice(-1), screen0El.innerHTML.slice(-2, -1)];
        if(isNaN(lastValue[0]) && isNaN(lastValue[1])) {
            var screenTopNew = screen0El.innerHTML.slice(0, -2) + screen0El.innerHTML.slice(-1);
            screen0El.innerHTML = screenTopNew;
           }
           clicked=false;
    }
} else if(x.target.webkitMatchesSelector(".calculator-Dot")) {
    // If WE CLICK DOT
    isCalculated();
    
    if(!clicked) {
      screen1El.innerHTML += valueEl;
      
      clicked = true;
    }
  }else if(x.target.webkitMatchesSelector(".calculator-equals")) {//if i click eaqual
    screen0El.innerHTML += screen1El.innerHTML;
    //////////I copy that also to calculate the string and show it in the screen
    screen1El.innerHTML = eval(screen0El.innerHTML);
    buttonClicked();
    //at last the calcuated happen
    calculated = true;
    clicked=false;

  }else{//if click the clear button 
    //if i click the clear button what will happen the screen empyt 1)
    //both screens
    screen0El.innerHTML = "";
    screen1El.innerHTML = "";

    clicked=false;

  }
})