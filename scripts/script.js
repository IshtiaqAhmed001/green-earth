const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const categoryItem = document.createElement('div');
        categoryItem.innerHTML =`
        <div onClick='loadCategoryTrees(${category.id})' class='cursor-pointer hover:bg category-item bg-[#15803D] hover:bg-[#1f964b] rounded-md text-white font-semibold p-2 mb-4'>
${category.category_name}
        </div>
        `
        categoryContainer.appendChild(categoryItem);
    })
}

const LoadAllTrees = () => {
      loadSpinner(true);
    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(data => displayTrees(data.plants));
}

const loadCategoryTrees =(id)=>{
    loadSpinner(true);
fetch(`https://openapi.programming-hero.com/api/category/${id}`)
.then(res=>res.json())
.then(data=>displayTrees(data.plants));
}

const displayTrees = (allTrees) => {
        loadSpinner(false)
    const treesContainer = document.getElementById('products');
    treesContainer.innerHTML='';

    allTrees.forEach(tree => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white rounded-lg p-4 shadow-md h-auto';
        productCard.innerHTML = `
      <div class='w-full h-[150px] rounded-lg overflow-hidden'>
        <img class='w-full h-full' src="${tree.image}" alt="">
      </div>
        <h6 class='my-2 font-bold '>${tree.name}</h6>
        <p class='max-h-[55px] text-sm text-ellipsis overflow-hidden'>${tree.description}</p>
        <div class='flex items-center justify-between my-4'>
        <button class="product-category text-sm font-semibold  rounded-full py-1 px-5 bg-[#DCFCE7] text-[#15803D]">${tree.category}</button>
        <h6 class='text-md font-semibold'>৳${tree.price}</h6>
        </div>
        <button class='bg-[#15803D] my-2 w-full py-1 text-white font-bold rounded-full'>Add to Cart</button>
    `;
        treesContainer.appendChild(productCard);
    })


}


const loadSpinner =(status)=>{
const spinner = document.getElementById('spinner');
if(status===true){
    spinner.classList.remove('hidden')
    console.log(spinner.classList)
}
if(status===false){
    spinner.classList.add('hidden')
        console.log(spinner.classList)

}
   

}

loadCategories();
LoadAllTrees();