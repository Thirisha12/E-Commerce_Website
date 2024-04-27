let productData = [];
const baseUrl = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";

async function fetchData() {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    productData = data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function openCity(evt, category) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(category).style.display = "grid";
  evt.currentTarget.className += " active";
  selectedTab = category;

  const categoryData = productData.categories.find((cat) => cat.category_name === category);
  if (categoryData) {
    const products = categoryData.category_products;
    const container = document.getElementById(category);
    container.innerHTML = "";
    products.forEach((product) => {
      container.insertAdjacentHTML("beforeend", displayCard(product));
    });
  }
}

function displayCard(product) {
    const price = product.price;
    const compareAtPrice = product.compare_at_price;
    const discountPercentage = Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
    const badgeText = product.badge_text; 

    const badgeHTML = badgeText ? `<div class="badge">${badgeText}</div>` : '';

    return `
    <div class="product-card" style="position: relative;">
        <img style="height:300px;"class="image" src="${product.image}" alt="" >
        ${badgeHTML} <!-- Include the badge element here -->
        <div class="product-info" style="position: relative; margin-top:120%;">
            <div class="product-name" style="display:flex;align-items:center;">
            <span style="font-size: larger;font-weight:600;padding:1rem 0 1rem 0;margin-right:20px">${
                  product.title.length < 12
                    ? product.title
                    : product.title.substring(0, 12) + ".."
                }</span>
                <p style="color:lightblack;">
                  <img style="width:7px;height:7px;margin-right:15px"src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Location_dot_black.svg/1024px-Location_dot_black.svg.png">
                  ${product.vendor}
                </p>
            </div>
            <div>
                <div class="price-detail">
                    <div>
                        <span style="font-weight:500;">RS ${product.price}.00</span>&nbsp;
                        <span id="org-price" style="color:gray;text-decoration:line-through">${
                          product.compare_at_price
                        }.00</span>
                    </div>
                    <span class="discount">${discountPercentage}% Off</span>
                </div>
                <button class="cart-btn">Add to Cart</button>
            </div>
        </div>
    </div>`;
}

fetchData().then(() => {
  openCity({ currentTarget: document.querySelector(".tablinks") }, "Men");
});
