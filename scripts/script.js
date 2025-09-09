const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const categoryItem = document.createElement('div');
        categoryItem.innerHTML = `
        <div 
        onClick='loadCategoryTrees(${category.id})' 
        class=' cursor-pointer hover:bg category-item bg-[#15803D] hover:bg-[#1f964b] rounded-md text-white font-semibold p-2 mb-4'>
${category.category_name}
        </div>
        `
        categoryContainer.appendChild(categoryItem);

        const allCategoryItems = categoryContainer.querySelectorAll('.category-item');

        allCategoryItems.forEach(selectedItem => {
            selectedItem.addEventListener('click', () => {
                allCategoryItems.forEach(item => item.classList.remove('active'));
                selectedItem.classList.add('active');
            });
        });


    });
}

const LoadAllTrees = () => {
    loadSpinner(true);
    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(data => displayTrees(data.plants));
}

const loadCategoryTrees = (id) => {
    loadSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(res => res.json())
        .then(data => displayTrees(data.plants));
}

const displayTrees = (allTrees) => {
    loadSpinner(false)
    const treesContainer = document.getElementById('products');
    treesContainer.innerHTML = '';

    allTrees.forEach(tree => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white rounded-lg p-4 shadow-md h-auto';
        productCard.innerHTML = `
      <div class='w-full h-[150px] rounded-lg overflow-hidden'>
        <img class='w-full h-full' src="${tree.image}" alt="">
      </div>
        <h6 id='modal-btn' class='my-2 font-bold hover:underline hover:decoration-[#15803D] hover:underline-offset-4 hover:cursor-pointer w-fit'>${tree.name}</h6>
        <p class='max-h-[55px] text-sm text-ellipsis overflow-hidden'>${tree.description}</p>
        <div class='flex items-center justify-between my-4'>
        <button class="product-category text-sm font-semibold  rounded-full py-1 px-5 bg-[#DCFCE7] text-[#15803D]">${tree.category}</button>
        <h6 class='text-md font-semibold'>৳${tree.price}</h6>
        </div>
        <button onClick='addToCart(${tree.id})' class='bg-[#15803D] my-2 w-full py-1 text-white font-bold rounded-full cursor-pointer'>Add to Cart</button>
    `;

        const modalBtn = productCard.querySelector('#modal-btn');
        modalBtn.addEventListener('click', () => {
            loadModal(tree);
        })
        treesContainer.appendChild(productCard);
    })

}

let cart = [];
const addToCart = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then(res => res.json())
        .then(data => {
            const newItem = data.plants;
            cart.push(newItem);
            displayCart(newItem);
        });

}

const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    displayCart();
}

const displayCart = (newItem) => {
    if (newItem) {
        alert(`${newItem.name} has been added to the cart!`);
    }
    const cartContainer = document.getElementById('cart-container');
    const cartTotalContainer = document.getElementById('cart-total-container');
    cartContainer.innerHTML = ``;

    let cartTotal = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = `<h3 class="text-center text-gray-500 font-semibold">Cart is empty</h3>`;
        cartTotalContainer.innerText = '';
    }

    else {
        cart.forEach(item => {
            cartTotal += parseInt(item.price);

            const newEntry = document.createElement('div');
            newEntry.className = 'cart-item flex justify-between items-center bg-[#F0FDF4] p-3 mb-2 rounded-md';
            newEntry.innerHTML = `
<div class="text-sm">
         <h5 class="font-bold mb-2">${item.name}</h5>
         <p>৳ <span class='cartItem-price'>${item.price}</span></p>
       </div>
       <button onClick='removeFromCart(${item.id})' class="text-xl text-gray-600 cursor-pointer">
        x
       </button>
`
            cartContainer.appendChild(newEntry);
        });

        cartTotalContainer.className = 'flex justify-end';
        cartTotalContainer.innerHTML = `
    <h6 class="font-bold text-sm" >Total: <span id="cart-total">${cartTotal}</span></h6>`
    }

}



const loadModal = (tree) => {
    const modal = document.getElementById('my_modal_5');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
     <h3 class='text-2xl font-bold mb-4'>${tree.name}</h3>
    <img class='w-full max-h-64 rounded-lg mb-4' src="${tree.image}" alt="">
    <p><span class="font-bold">Category: </span> 
    <span>${tree.category}</span></p>
    <p class='my-4'><span class="font-bold">Price: </span> 
    <span>৳${tree.price}</span></p>
    <p><span class="font-bold">Description: </span> 
    <span>${tree.description}</span></p>
    `
    modal.showModal()
}

const loadSpinner = (status) => {
    const spinner = document.getElementById('spinner');
    if (status === true) {
        spinner.classList.remove('hidden')
    }
    if (status === false) {
        spinner.classList.add('hidden')
    }


}

loadCategories();
LoadAllTrees();