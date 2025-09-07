const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}

const displayCategories = (categories) => {
    const categoryUl = document.getElementById('category-ul');
    categories.forEach(category => {
        const categoryLi = document.createElement('li');
        categoryLi.className = 'category-li bg-[#15803D] rounded-md text-white font-semibold p-2 mb-4';
        categoryLi.innerText = category.category_name;
        categoryUl.appendChild(categoryLi);
    })
}

constLoadAllTrees = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(data => displayAllTrees(data.plants))
}

const displayAllTrees = (allTrees) => {
    const treesContainer = document.getElementById('products');

    allTrees.forEach(tree => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white rounded-lg p-4';
        productCard.innerHTML = `
      <div class='w-full h-[150px] rounded-lg mb-2 overflow-hidden'>
        <img class='w-full h-full' src="${tree.image}" alt="">
      </div>
        <h6>${tree.name}</h6>
        <p>${tree.description}</p>
        <button class="product-category">${tree.category}</button>
        <h6>${tree.price}</h6>
    `;
        treesContainer.appendChild(productCard);
    })


}


loadCategories();
constLoadAllTrees();