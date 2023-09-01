// Array di oggetti rappresentanti le slides
const slides = [
  {
    title: "Slide 1",
    text: "Lorem ipsum...",
    path: "01.webp",
  },
  {
    title: "Slide 2",
    text: "Lorem ipsum...",
    path: "02.webp",
  },
  {
    title: "Slide 3",
    text: "Lorem ipsum...",
    path: "03.webp",
  },
  {
    title: "Slide 4",
    text: "Lorem ipsum...",
    path: "04.webp",
  },
  {
    title: "Slide 5",
    text: "Lorem ipsum...",
    path: "05.webp",
  },
];

// Elemento del DOM per contenere le slides
const slidesContainerElement = document.getElementById("slides-container");

// Elemento del DOM per contenere le miniature delle slides
const thumbnailsContainerElement = document.getElementById(
  "thumbnails-container"
);

// Indice della slide attualmente attiva
let activeSlide = 0;

// Funzione per renderizzare una singola slide in base all'indice
function newSlide(index) {
  const slide = slides[index];
  slidesContainerElement.innerHTML = `
    <div class="slide active">
      <img src="./img/${slide.path}" alt="${slide.title}" />
      <div class="slide-text">
        <h2>${slide.title}</h2>
        <p>${slide.text}</p>
      </div>
    </div>
  `;
}

// Funzione per renderizzare le miniature delle slides
function newSlideThumb() {
  thumbnailsContainerElement.innerHTML = "";
  slides.forEach((slide, index) => {
    const thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("thumb");
    thumbnailElement.innerHTML = `<img src="./img/${slide.path}" alt="${slide.title}" />`;
    // Aggiungi un gestore di eventi al clic su una miniatura per andare alla slide corrispondente
    thumbnailElement.addEventListener("click", () => {
      goToSlide(index);
    });
    // Aggiungi la classe 'active' alla miniatura se è la slide attiva
    if (index === activeSlide) {
      thumbnailElement.classList.add("active");
    }
    thumbnailsContainerElement.appendChild(thumbnailElement);
  });
}

// Funzione per passare alla prossima slide
function goToNextSlide() {
  const nextIndex = (activeSlide + 1) % slides.length;
  goToSlide(nextIndex);
}

// Funzione per passare alla slide precedente
function goToPrevSlide() {
  const prevIndex = (activeSlide - 1 + slides.length) % slides.length;
  goToSlide(prevIndex);
}

// Funzione per andare a una slide specifica in base all'indice
function goToSlide(index) {
  if (index !== activeSlide) {
    activeSlide = index;
    newSlide(index);
    newSlideThumb();
  }
}

// Inizializza la visualizzazione con la prima slide
newSlide(activeSlide);
// Renderizza le miniature delle slides
newSlideThumb();

// Elementi del DOM per i pulsanti "Next" e "Prev"
const nextButton = document.getElementById("go-next");
const prevButton = document.getElementById("go-prev");

// // Aggiungi gestori di eventi ai pulsanti "Next" e "Prev" per passare alle slide successive o precedenti
nextButton.addEventListener("click", goToNextSlide);
prevButton.addEventListener("click", goToPrevSlide);

//  Autoplay
const startAutoplayButton = document.getElementById("start-autoplay");
const stopAutoplayButton = document.getElementById("stop-autoplay");
const reverseAutoplayButton = document.getElementById("reverse-autoplay");

//  Setto le variabili per gestire l'autoplay
let autoplayInterval = false;
let autoplayForward = true;

//  Attivo l'interval in base alla direction dell'autoplay
function setAutoplay() {
  if (!autoplayInterval) {
    if (autoplayForward) {
      autoplayInterval = setInterval(goToNextSlide, 1000);
    } else {
      autoplayInterval = setInterval(goToPrevSlide, 1000);
    }
  }
}

//  Clearo l'interval
function stopAutoplay() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = false;
  }
}

//  Inverto la direction
function reverseAutoplay() {
  stopAutoplay();
  autoplayForward = !autoplayForward;
  setAutoplay();
}

//  Gestisco i click sui pulsanti autoplay
startAutoplayButton.addEventListener("click", setAutoplay);
stopAutoplayButton.addEventListener("click", stopAutoplay);
reverseAutoplayButton.addEventListener("click", reverseAutoplay);
