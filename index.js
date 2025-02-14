let container = document.getElementById("container");
let btnContainer = document.getElementById("btn-container");

async function getData() {
    try {
        let response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
            throw new Error(`HTTP Request : ${response.statusText}`);
        }
        let result = await response.json();
        localStorage.setItem("products", JSON.stringify(result));
        createButton();
        displayData();
    } catch (err) {
        console.error(err);
    }
}
function createButton() {
    btnContainer.innerHTML = ``;
    let products = JSON.parse(localStorage.getItem("products")) || [];
    if (products.length !== 0) {
        let result = Array.from(new Set(products.map(obj => obj.category)));
        result.forEach(ele => {
            let button = document.createElement("button");
            button.textContent = ele;
            button.addEventListener("click", () => {
                filterData(ele);
            })
            btnContainer.appendChild(button);
        })
    }
}
function filterData(category) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    if (products.length !== 0) {
        let result = products.filter(obj => obj.category === category);
        displayData(result);
    }
}

function displayData(filterProducts) {
    container.innerHTML = ``;
    let products = JSON.parse(localStorage.getItem("products")) || [];
    if (filterProducts !== undefined) {
        products = filterProducts;
    }
    if (products.length === 0) {
        container.innerHTML = "No data Available";
    } else {
        products.forEach(obj => {
            let item = document.createElement("div");
            item.innerHTML = `
                <div>
                <img src=${obj.image}>
                </div>
                <div>
                <p >Title : ${obj.title}</p>
                <p>Category : ${obj.category}</p>
                </div>
            `;
            container.appendChild(item);
        })
    }
}
window.onload = getData;