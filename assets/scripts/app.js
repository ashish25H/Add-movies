const addMovieModel = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById("backdrop");
const cancleAddMovieButton = addMovieModel.querySelector(".btn--passive");
const confirmAddMovieButton = cancleAddMovieButton.nextElementSibling;
const userInputs = addMovieModel.querySelectorAll('input');
const entryTextSection = document.getElementById("entry-text");

const movies = [];

const updateUI = () => {
    if(movies.length === 0){
        entryTextSection.style.display = 'block';
    }else{
        entryTextSection.style.display = 'none';
    }
};

const deleteNewMovieHandler = (movieId) => {

    let movieIndex = 0;
    for(const movie of movies){
        if(movie.id === movieId){
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById("movie-list");
    listRoot.children[movieIndex].remove();
    
};

const renderNewMovieElement = (id,title, imageUrl, rating) => {
    const newMoviesElement = document.createElement('li');
    newMoviesElement.className = 'movie-element';
    newMoviesElement.innerHTML = `
      
    <div class="movie-element_image">
       <img src = "${imageUrl}" alt = "${title}">
    </div>
    <div class = "movie-element_info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>

    `;

    newMoviesElement.addEventListener('click' , deleteNewMovieHandler.bind(null, id));
    const listRoot = document.getElementById("movie-list");
    listRoot.appendChild(newMoviesElement);
}



const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
}

const toggleMovieModal = () => {
    addMovieModel.classList.toggle('visible');
    toggleBackdrop();
};

const cancleAddMovie = () =>{
     toggleMovieModal();
     clearMoviesInput();
};

const backdropClickHandler = () => {
    toggleMovieModal();
};

const clearMoviesInput = () => {
    for(const userInput of userInputs){
        userInput.value = '';
    }
}

const addMovieHandler = () => {
     const titleValue = userInputs[0].value;
     const imageUrlValue = userInputs[1].value;
     const ratingValue = userInputs[2].value;

     if(titleValue.trim() === '' || imageUrlValue.trim() === '' || ratingValue.trim() === '' || +ratingValue < 1 || +ratingValue > 5){
        alert('Please enter valid values (rating beetween 1 and 5 )');
        return;
     }

     const newMovies = {
        id : Math.random().toString(),
        title : titleValue,
        image : imageUrlValue,
        rating : ratingValue
     };

     movies.push(newMovies);
     console.log(movies);

    
     toggleMovieModal();
     clearMoviesInput();
     renderNewMovieElement( newMovies.id, newMovies.title, newMovies.image, newMovies.rating);
     updateUI();
};


startAddMovieButton.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancleAddMovieButton.addEventListener("click", cancleAddMovie );
confirmAddMovieButton.addEventListener('click', addMovieHandler);