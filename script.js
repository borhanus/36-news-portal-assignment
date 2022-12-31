// Category Fetch
const loadCategory = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
        const data = await res.json();
        category(data.data.news_category);
    }
    catch (error) {
        console.error(error);
    }
}
loadCategory();

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
    categoryListItems[7].classList.add('cat-active');
    categoryListItems.forEach(categoryListItem => {
        categoryListItem.addEventListener('click', function (event) {
            categoryListItems.forEach(categoryListItem => {
                categoryListItem.classList.remove('cat-active');
            })
            event.target.classList.add('cat-active');
        })
    });
}

// Category Items Fetch
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

// Category Items publish
let todaysPickArray = [];
let todaysTrendingArray = [];
const categoryItemsDetails = items => {
    loadding(false);

    const numberOfCategory = document.getElementById('numberOfCategory');
    numberOfCategory.innerText = items.length;
    const newsPosts = document.getElementById('newsPosts');
    newsPosts.innerHTML = ``;
    // postPublisher(items);
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
                        <button onclick="modalCallForNews('${item._id}')" type="button" class="fa-solid fa-arrow-right fs-2 btn text-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        `
        newsPosts.appendChild(div);

        if (item.others_info.is_todays_pick) {
            todaysPickArray.push(item._id);
        }
        if (item.others_info.is_trending) {
            todaysTrendingArray.push(item._id);
        }
    });
    const todaysPick = document.getElementById('todaysPick');
    todaysPick.setAttribute('onclick', `test()`)
    const todaysTrending = document.getElementById('todaysTrending');
    todaysPick.setAttribute('onclick', `test()`)
}

// Modal
const modalCallForNews = async (ID) => {
    loadding(true);
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/${ID}`);
        const data = await res.json();
        modalPostNews(data.data[0])
    }
    catch (error) {
        console.error(error);
    }
}
const modalPostNews = (data) => {
    const title = document.getElementById('dailyBriefModal');
    title.innerText = data.title;
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
    <div class="card border-0">
        <div class="card-body p-0">
            <img class="d-block mx-auto mb-3 img-fluid" src="${data.image_url}" alt="">
            <p class="card-text">${data.details}</p>
        </div>
    </div>
    `;



}
// Modal


const postPublisher = (items) => {
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
                        <button onclick="modalCallForNews('${item._id}')" type="button" class="fa-solid fa-arrow-right fs-2 btn text-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        `
        newsPosts.appendChild(div);

        if (item.others_info.is_todays_pick) {
            todaysPickArray.push(item._id);
        }
        if (item.others_info.is_trending) {
            todaysTrendingArray.push(item._id);
        }
    });
}











// Items Found alert
const alert = () => {
    const alert = document.getElementById('categoryAlert');
    alert.classList.remove('d-none');
}
// Spinner
const loadding = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}
categoryItems(08);






// let todaysPickArray = [];
// let todaysTrendingArray = [];

// Trending / Today's Pick
const test = () => {
    const newsPosts = document.getElementById('newsPosts');
    newsPosts.innerHTML = ``;
    if (todaysPickArray.length === 1) {
        todaysPickArray.forEach(data => {
            todaysTrendingFetch(data);
        })
    }
    if (todaysTrendingArray.length === 19) {
        todaysTrendingArray.forEach(data => {
            todaysTrendingFetch(data);
        })
    }

    console.log(todaysTrendingArray.length);
}

const todaysTrendingFetch = async (ID) => {
    loadding(true);
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/${ID}`);
        const data = await res.json();
        todaysTrendingPosts(data.data)
    }
    catch (error) {
        console.error(error);
    }
}

const todaysTrendingPosts = items => {
    loadding(false);
    const numberOfCategory = document.getElementById('numberOfCategory');
    numberOfCategory.innerText = items.length;
    
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
                        <button onclick="modalCallForNews('${item._id}')" type="button" class="fa-solid fa-arrow-right fs-2 btn text-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        `
        newsPosts.appendChild(div);

    });
}
// const todaysPick = [];
// const trending = [];
// const trendingPicksCategoryItemsDetails = (items) => {
//     items.forEach(item => {
//         if (item.others_info.is_todays_pick || item.others_info.is_trending) {
//             todaysPick.push(item._id);
//             console.log(item._id);
//             trending.push(item._id);
//             console.log(item._id + 'aaaaaaaaaaaaaa551');
//         }
//     })
// }
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
        // trendingPicksCategoryItems(08, `${event.target.innerText}`)
    })
});


































/*
    console.log('data');
    console.log(data);






*/