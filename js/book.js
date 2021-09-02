const searchBook = () => {
    const getSearch = document.getElementById('search-field');
    const getText = getSearch.value;
    getSearch.value = '';
    // error handeling for empty search 
    if (getText === '') {
        const bookDetails = document.getElementById('book-details');
        bookDetails.innerText = '';
        const h5 = document.createElement('h5');
        h5.innerText = `Search item can not be empty`;
        bookDetails.appendChild(h5);
    }
    else {
        // get url 
        const url = `http://openlibrary.org/search.json?q=${getText}`;
        fetch(url)
            .then(res => res.json())
            .then(json => displaySearchResult(json.docs));
    }
}
const displaySearchResult = docs => {
    // get found result or not
    const bookDetails = document.getElementById('book-details');
    bookDetails.innerText = '';
    const h5 = document.createElement('h5');
    if (docs.length !== 0) {
        h5.innerText = `Total result found: ${docs.length}`;
    } else {
        h5.innerText = `Result not found`;
    }
    bookDetails.appendChild(h5);
    // display search books which are found 
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // display 9 results 
    docs.slice(0, 6).forEach(book => {
        const pictureUrl = `https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : ''}-M.jpg`;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <div class="card-body">
                <img src="${pictureUrl}" class="card-img-top" style="height:60%" alt="">
                <div class="card-footer mt-5">
                <h5 class="card-text">Name: <span class="text-primary">${book.title ? book.title : ''}</span></h5>
                <h6 class="card-text">Writer: <span class="text-success">${book.author_name[0] ? book.author_name[0] : ''}</span></h6>
                <h6 class="card-text">Publisher: <span class="text-success">${book.publisher[0] ? book.publisher[0] : ''}</span></h6>
                <h6 class="card-text">First Publish: <span class="text-info">${book.first_publish_year ? book.first_publish_year : ''}</span></h6>
                </div>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
}