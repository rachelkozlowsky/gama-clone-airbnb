const API_URL = "https://dry-cliffs-94979.herokuapp.com/";

let currentPage = 1;
let ITENS_PER_PAGE = 8;
/*
const filterPlaces = (input, places) =>{
    return places.filter(places => places.name.ToLowerCase().includes(input.value.toLowerCase()))
}
*/


 const paginateData = (data) => {
        return data.reduce( (total, current, index) => {
                const belongArrayIndex = Math.ceil((index + 1) / ITENS_PER_PAGE) - 1;
                total[belongArrayIndex] ? total[belongArrayIndex].push(current) : total.push([current]);
                return total;
            }, [])
} 



const fetchAPI = async url => {
    let response = await fetch(url);
    const textResponse = await response.text();
    return JSON.parse(textResponse);
}

const changePage = (pageToBeRendered) =>{
    currentPage = pageToBeRendered
 
    const row = document.querySelector('.row');
    while(row.firstChild){
        row.removeChild(row.firstChild)
    }
 
    renderPage()
   
}

const renderPaginationMenu = (paginatedData) =>{

    const paginationContainer = document.querySelector('.pagination');
    
    while(paginationContainer.firstChild){
        paginationContainer.removeChild(paginationContainer.firstChild)
    }

    const previousPage = document.createElement('span');

    previousPage.className = 'page-changer';
    previousPage.innerHTML = '<';
    previousPage.addEventListener('click', () => 
        currentPage <= 1 ? () => {} : changePage(currentPage - 1),
        );
    paginationContainer.appendChild(previousPage);

    paginatedData.forEach((_,index) => {
        const pageButton = document.createElement('span');
        pageButton.innerHTML = index + 1;
        pageButton.addEventListener('click', () => changePage(index +1));

        if (currentPage === index+1){
            pageButton.className = 'active';
        }
        paginationContainer.appendChild(pageButton);
       
    });



    const nextPage = document.createElement('span');
    nextPage.className = 'page-changer';
    nextPage.innerHTML = '>';
    nextPage.addEventListener('click', () =>
    currentPage >= paginatedData.length
     ? () => {}
      : changePage(currentPage + 1),
      );

    paginationContainer.appendChild(nextPage);
    
   
};

const renderPage = async() => {
    
    const apiData = await fetchAPI(API_URL);

    const paginatedData = paginateData(apiData);

    
    console.log(paginatedData)

    renderPaginationMenu(paginatedData);
    
   row = document.querySelector("row");


   


 fetch(API_URL)
   .then(response => response.text())
   .then(result => {
    
     const data = JSON.parse(result);

    

       
paginatedData[currentPage -1].forEach(element => { 

     const {name, photo, price, property_type} = element;

      row = document.getElementById("row");

      div = document.createElement("div");
      div.className = "col-md-4";

      card = document.createElement("div");
      card.className = "card mb-4 box-shadow";

      image = document.createElement("img");
      image.className = "card-img-top";
      image.src = element.photo;

      cardBody = document.createElement("div");
      cardBody.className = "card-body";

      cardText = document.createElement("div");
      cardText.className = "card-text";

      propertyType = document.createElement("p");
      propertyType.className = "property-type";
      propertyType.innerHTML = element.property_type;

      propertyName = document.createElement("p");
      propertyName.className = "property-name";
      propertyName.innerHTML = element.name;

      propertyPrice = document.createElement("p");
      propertyPrice.className = "property-price";
      propertyPrice.innerHTML = `Total de R$ ${element.price}.`;

      row.appendChild(div);
      div.appendChild(card);
      card.appendChild(image);
      card.appendChild(cardBody);
      cardBody.appendChild(cardText);
      cardText.appendChild(propertyType);
      cardText.appendChild(propertyName);
      cardText.appendChild(propertyPrice);
    
    });
  });
}

renderPage()