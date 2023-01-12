// Vriable global

let compteur = 0 
let timer, elements, slides, speed, transition;

window.onload = () => {
    // on recupere  le diapo
    const diapo = document.querySelector(".diapo");

    //on recupere le data speed
    speed = diapo.dataset.speed;
    transition = diapo.dataset.transition;

    elements = document.querySelector(".elements");

    

    //on clone la premeire image

    let firstImage = elements.firstElementChild.cloneNode(true);

    // on injecte le clone a la fin du diapo

    elements.appendChild(firstImage);

    slides = Array.from(elements.children);

    //on recup la largueur d'une slide
    slideWidth = diapo.getBoundingClientRect().width

    // on recupere les fleches

    let next = document.querySelector(".flechedroite");
    let prev = document.querySelector(".flechegauche");
    // je gere le click

    next.addEventListener("click", slideNext);
    prev.addEventListener("click", slidePrev);

    // on automatise le defilement

    timer = setInterval(slideNext, speed)

    // on gére l'arret et la reprise 
    diapo.addEventListener("mouseover", stopTimer);
    diapo.addEventListener("mouseout", startTimer);

}

// fait defiler le diaporama vers la droite

function slideNext(){
    // on increment le compteur
    compteur++;
    elements.style.transition = transition+"ms linear";


    let decal = -slideWidth * compteur;
    elements.style.transform = `translateX(${decal}px`;


    //on attend la fin de la traznstion et on rambobine de façon caché

    setTimeout(function(){
        if(compteur >= slides.length - 1){
            compteur = 0;
            elements.style.transition = "unset";
            elements.style.transform = "translateX(0)";
        }
    }, transition);

}
// cette fonction fait defiler vers la gauche

function slidePrev(){

    //on decremente le compteur
    compteur--;
    elements.style.transition = transition+"ms linear";
    

    if(compteur < 0){
        compteur = slides.length - 1;
        let decal = -slideWidth * compteur;
        elements.style.transition = "unset";
        elements.style.transform = `translateX(${decal}px`;
        setTimeout(slidePrev, 1);

    }

       let decal = -slideWidth * compteur;
       elements.style.transform = `translateX(${decal}px`;

}

function stopTimer(){
    clearInterval(timer);
}

function startTimer(){
    timer = setInterval(slideNext, speed);
}