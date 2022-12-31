// Category Fetch
const loadCategory = async (categories) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/${categories}`);
        const data = await res.json();
        category(data.data.news_category);
    }
    catch (error) {
        console.error(error);
    }
}
loadCategory('categories');

// Category Nav
const category = category => {
    const categoryList = document.getElementById('categoryList');
    category.forEach(data => {
        const li = document.createElement('li');
        li.classList.add('nav-item', 'mx-1', 'mb-3', 'booooom')
        li.innerHTML = `
            <a onclick="categoryItems(${data.category_id}, '${data.category_name}')" class="nav-link" href="#">${data.category_name}</a>
        `
        categoryList.appendChild(li);
    });

    const categoryListItems = document.querySelectorAll('#categoryList li a');
    categoryListItems[1].classList.add('cat-active');
    categoryListItems.forEach(categoryListItem => {
        categoryListItem.addEventListener('click', function (event) {
            categoryListItems.forEach(categoryListItem => {
                categoryListItem.classList.remove('cat-active');
            })
            event.target.classList.add('cat-active');
        })
    });
}

const categoryItems = async (ID, name) => {
    loadding(true);
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/0${ID}`);
        const data = await res.json();
        categoryItemsDetails(data.data);
        alert();
        return data.data;
    }
    catch (error) {
        console.error(error);
    }
    finally {
        const nameOfCategory = document.getElementById('nameOfCategory');
        nameOfCategory.innerText = `${name ? 'for ' + name : ''}`;
    }
}



const categoryItemsDetails = items => {
    loadding(false);
    const numberOfCategory = document.getElementById('numberOfCategory');
    numberOfCategory.innerText = items.length;
    const newsPosts = document.getElementById('newsPosts');
    newsPosts.innerHTML = ``;

    items.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('card', 'mb-3');
        div.innerHTML =
            `
        <div class="row g-0">
            <div class="col-md-3 card-body d-flex justify-content-center">
                <img src="${item.thumbnail_url}"
                    class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-9 d-grid align-content-between">
                <div class="card-body">
                    <h5 class="card-title fs-3">${item.title}</h5>
                    <p class="card-text text-muted">${item.details.slice(0, 300)}</p>
                    <br>
                    <p class="card-text text-muted">${item.details.slice(300, 400) ? item.details.slice(300, 400) + ' . . .' : ''}</p>
                </div>
                <div class="d-flex justify-content-between align-items-center card-body">
                    <div class="d-flex gap-2 align-items-center">
                        <img class="rounded-circle" src="${item.author.img}" alt="" height="40" width="40">
                        <ul class="list-no m-0 p-0">
                            <li class="fw-semibold">${item.author.name ? item.author.name : 'unavailable'}</li>
                            <li class="text-muted fw-semibold fs-6"><small>${item.author.published_date ? item.author.published_date.slice(0, 10) : 'unavailable'}</small></li>
                        </ul>
                    </div>
                    <div>
                        <i class="fa-regular fa-eye"></i>
                        <span class="ps-2 fw-semibold">${item.total_view ? item.total_view : 'unavailable'}</span>
                    </div>
                    <ul class="d-flex m-0 p-0 gap-3">
                        <li><i class="fa-regular fa-star-half-stroke"></i></li>
                        <li><i class="fa-regular fa-star"></i></li>
                        <li><i class="fa-regular fa-star"></i></li>
                        <li><i class="fa-regular fa-star"></i></li>
                        <li><i class="fa-regular fa-star"></i></li>
                    </ul>
                    <div class="pe-3">
                        <a href=""><i class="fa-solid fa-arrow-right fs-2"></i></a>
                    </div>
                </div>
            </div>
        </div>
        
        `
        newsPosts.appendChild(div);
    });
}

const alert = () => {
    const alert = document.getElementById('categoryAlert');
    alert.classList.remove('d-none');
}
const loadding = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}
categoryItems(02);




// trendingPicks()



const trendingPicksCategoryItems = async (ID, name) => {
    loadding(true);
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/0${ID}`);
        const data = await res.json();
        trendingPicksCategoryItemsDetails(data.data);
        alert();
        return data.data;
    }
    catch (error) {
        console.error(error);
    }
    finally {
        const nameOfCategory = document.getElementById('nameOfCategory');
        nameOfCategory.innerText = `${name ? 'for ' + name : ''}`;
    }
}
const todaysPick = [];
const trending = [];
const trendingPicksCategoryItemsDetails = (items) => {
    items.forEach(item => {
        if (item.others_info.is_todays_pick || item.others_info.is_trending) {
            todaysPick.push(item._id);
            console.log(item._id);
            trending.push(item._id);
            console.log(item._id + 'aaaaaaaaaaaaaa551');
        }
    })
}
// console.log(todaysPick);
// console.log(trending);

// categoryItemsDetails(todaysPick);
// categoryItemsDetails(trending);
const todayTrendings = document.querySelectorAll('#todayTrending button');
todayTrendings.forEach(todayTrending => {
    todayTrending.addEventListener('click', function (event) {
        todayTrendings.forEach(todayTrending => {
            todayTrending.classList.remove('my-active');
        })
        event.target.classList.add('my-active');
        trendingPicksCategoryItems(08, `${event.target.innerText}`)
    })
});


// console.log(todaysPick);
// console.log(trending);









/*
    console.log('data');
    console.log(data);






*/