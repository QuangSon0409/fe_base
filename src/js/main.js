const api = "http://localhost:8080/api/pokemons";

async function fetchData() {
  try {
    const response = await fetch(api, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    });
    const { data } = await response.json();
    if (document.querySelector(".products")) {
      document.querySelector(".products").innerHTML = showProduct(data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();

const showProduct = (data) => {
  if (!Array.isArray(data)) {
    return "";
  } else {
    return data
      .map((item) => {
        return ` <div class="product">
                <div class="product-image">
                <img
                    src="${item.image}"
                    alt=""
                />
                </div>
                <p class="product-title">${item.pokemonName}</p>
                <button class="btn-product"><a href="product-detail.html?id=${item.id}">chi tiết sản phẩm</a></button>
            </div>`;
      })
      .join("");
  }
};

if (document.querySelector(".search_form-button")) {
  document
    .querySelector(".search_form-button")
    .addEventListener("click", (e) => {
      e.preventDefault();
      const pokemonName = document.querySelector(".search_form-input").value;
      console.log(pokemonName);
      fetch(`http://localhost:8080/api/pokemons?_keyword=${pokemonName}`)
        .then((response) => response.json())
        .then(({ data }) => {
          document.querySelector(".products").innerHTML = showProduct(data);
        });
    });
}
let id = new URLSearchParams(window.location.search).get("id");
if (id) {
  const fetchDataByid = () => {
    try {
      fetch(`http://localhost:8080/api/pokemons/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(),
      })
        .then((response) => response.json())
        .then(({ data }) => {
          console.log(data);
          document.querySelector(".container-detail").innerHTML =
            showProductById(data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const showProductById = (data) => {
    for (let product of data) {
      return `
      <a class="back-home" href="index.html" style="text-decoration: none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path
              d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z"
            />
          </svg>
          <span
            style="
              font-size: 30px;
              font-weight: bold;
              color: antiquewhite;
              padding-left: 5px;
              margin-bottom: 10px;
            "
            >Back To Home</span
          >
        </a>
        <div class="product_detail">
          <div class="product_detail-image">
            <img
              src="${product.image}"
              alt=""
            />
          </div>
          <div class="product_detail-description">
            <div class="detail-title">
              <span id="title">Name:</span>
              <span class="product_title">${product.pokemonName}</span>
            </div>
            <div class="detail-description">
              <span id="title">Description:</span>
              <span class="desctiption">
                ${product.description}
              </span>
            </div>
  
            <div class="detail-level">
              <span id="title">Level: </span>
              <span class="level">${product.level}</span>
            </div>
          </div>
        </div>
      
      `;
    }
  };
  fetchDataByid();
}
