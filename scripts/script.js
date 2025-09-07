const loadCategories = ()=>{
    fetch('https://openapi.programming-hero.com/api/categories')
    .then(res=>res.json())
    .then(data=>displayCategories(data.categories))
}

const displayCategories =(categories)=>{
    const categoryUl = document.getElementById('category-ul');
categories.forEach(category=>{
   const categoryLi = document.createElement('li');
   categoryLi.className='category-li bg-[#15803D] rounded-md text-white font-semibold p-2 mb-4';
   categoryLi.innerText=category.category_name;
   categoryUl.appendChild(categoryLi);
})
}

loadCategories();