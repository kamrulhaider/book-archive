const searchBook = () => {

    // getting the search text
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;

    // handling empty input 
    if (searchText === '') {
        const errorText = document.getElementById('error-txt');
        errorText.innerText = 'Please enter your desired book name'
    }
    else {
        // fetching data by dynamic url
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(books => displayResult(books));
    };
    // clear after search
    searchField.value = '';
};

// displaying book result function
const displayResult = books => {

    const mainObject = books.docs;
    const booksResult = document.getElementById('books-result');
    // clear previous search
    booksResult.innerText = '';

    if (books.numFound === 0) {
        const errorText = document.getElementById('error-txt');
        errorText.innerText = 'No result found'
    } else {
        // total result 
        const totalFound = document.getElementById('total-found');
        totalFound.innerText = books.numFound;

        // loop through each element
        mainObject.forEach(book => {

            // img error 
            let imgUrl = book.cover_i;
            if (imgUrl !== undefined) {
                imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            } else {
                imgUrl = 'default.jpg';
            }

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100">
                    <img src="${imgUrl}" class="card-img-top" style="width:100%; height:236px;" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Author: ${book.author_name}</p>
                        <p class="card-text">Publisher: ${book.publisher}</p>
                        <p class="card-text">First Published: ${book.first_publish_year}</p>
                    </div>
                </div>
            `;
            booksResult.appendChild(div);
        });
    };
};