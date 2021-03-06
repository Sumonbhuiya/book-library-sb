// search for finding book 
const searchBook = () => {
    const getSearch = document.getElementById('search-field');
    const getText = getSearch.value;
    // set clear value 
    getSearch.value = '';
    const bookDetails = document.getElementById('book-details');
    bookDetails.innerText = '';
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // error handeling for empty search 
    if (getText === '') {
        const h5 = document.createElement('h5');
        h5.innerText = `Search item can not be empty`;
        bookDetails.appendChild(h5);
    }
    else {
        // get url 
        const url = `https://openlibrary.org/search.json?q=${getText}`;
        fetch(url)
            .then(res => res.json())
            .then(json => displaySearchResult(json));
    }
}
// find search book function 
const displaySearchResult = result => {
    // get found result or not
    const bookDetails = document.getElementById('book-details');
    bookDetails.innerText = '';
    const h5 = document.createElement('h5');
    if (result.numFound !== 0) {
        h5.innerText = `Total result found: ${result.numFound}`;
    } else {
        h5.innerText = `Result not found`;
    }
    bookDetails.appendChild(h5);
    // display search books which are found 
    const books = result.docs;
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // display 15 results using HTML  
    books.slice(0, 15).forEach(book => {
        // chack first array element for publisher and author 
        const array = arrayIndex => {
            if (!arrayIndex) {
                return '';
            }
            else {
                return arrayIndex[0];
            }
        }
        const pictureUrl = `https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : ''}-M.jpg`;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <div class="card-body">
                <img src="${pictureUrl}" class="card-img-top" style="height:400px" alt="">
                <div class="card-footer mt-3">
                <h5 class="card-text">Name: <span class="text-primary">${book.title ? book.title : ''}</span></h5>
                <h6 class="card-text">Writer: <span class="text-success">${array(book.author_name)}</span></h6>
                <h6 class="card-text">Publisher: <span class="text-success">${array(book.publisher)}</span></h6>
                <h6 class="card-text">First Publish: <span class="text-info">${book.first_publish_year ? book.first_publish_year : ''}</span></h6>
                </div>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
}