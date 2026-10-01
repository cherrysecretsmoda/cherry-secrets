// ==========================================
// CHERRY SECRET — SCRIPT PRINCIPAL
// ==========================================

const products = [
  {
    id: 1,
    name: "Vestido Cherry",
    category: "vestidos",
    label: "VESTIDOS",
    price: 1.00,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 2,
    name: "Look Secret",
    category: "conjuntos",
    label: "CONJUNTOS",
    price: 149.90,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    name: "Conjunto Cherry",
    category: "conjuntos",
    label: "CONJUNTOS",
    price: 169.90,
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    name: "Vestido Secret Red",
    category: "vestidos",
    label: "VESTIDOS",
    price: 139.90,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 5,
    name: "Cherry Girl",
    category: "conjuntos",
    label: "CONJUNTOS",
    price: 159.90,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 6,
    name: "Top Secret",
    category: "blusas",
    label: "BLUSAS",
    price: 69.90,
    image: "https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=900&q=80"
  }
];


// ==========================================
// CARRINHO
// ==========================================

let cart = JSON.parse(
  localStorage.getItem("cherrySecretCart")
) || [];


// ==========================================
// DINHEIRO
// ==========================================

function money(value){

  return Number(value).toLocaleString("pt-BR",{
    style:"currency",
    currency:"BRL"
  });

}


// ==========================================
// SALVAR
// ==========================================

function saveCart(){

  localStorage.setItem(
    "cherrySecretCart",
    JSON.stringify(cart)
  );

  updateCartCount();
  renderCartPage();

}


// ==========================================
// CONTADOR
// ==========================================

function getCartQuantity(){

  return cart.reduce(
    (total,item)=>total + item.quantity,
    0
  );

}


function updateCartCount(){

  const quantidade = getCartQuantity();

  document.querySelectorAll("[data-cart-count]").forEach(el=>{
    el.textContent = quantidade;
  });

  const contador =
    document.getElementById("floatingCartCount");

  if(contador){
    contador.textContent = quantidade;
  }

}


// ==========================================
// ADICIONAR AO CARRINHO
// ==========================================

function addToCart(id, size="Único"){

  const product = products.find(
    p => p.id === Number(id)
  );

  if(!product){
    return;
  }

  const existing = cart.find(
    item =>
      item.id === product.id &&
      item.size === size
  );

  if(existing){

    existing.quantity++;

  }else{

    cart.push({
      id:product.id,
      name:product.name,
      category:product.category,
      label:product.label,
      price:product.price,
      image:product.image,
      size:size,
      quantity:1
    });

  }

  saveCart();

  // Pequeno aviso
  showAddedMessage(product.name);

}


// ==========================================
// AVISO
// ==========================================

function showAddedMessage(name){

  const old = document.getElementById(
    "cherry-added-message"
  );

  if(old) old.remove();

  const message =
    document.createElement("div");

  message.id =
    "cherry-added-message";

  message.textContent =
    `${name} foi adicionado ao carrinho 🍒`;

  message.style.position = "fixed";
  message.style.left = "50%";
  message.style.bottom = "95px";
  message.style.transform = "translateX(-50%)";
  message.style.background = "#650818";
  message.style.color = "#fff";
  message.style.padding = "13px 20px";
  message.style.borderRadius = "999px";
  message.style.zIndex = "10000";
  message.style.fontSize = "14px";
  message.style.whiteSpace = "nowrap";
  message.style.boxShadow =
    "0 8px 25px rgba(0,0,0,.2)";

  document.body.appendChild(message);

  setTimeout(()=>{
    message.remove();
  },2200);

}


// ==========================================
// QUANTIDADE
// ==========================================

function changeQuantity(id,size,delta){

  const item = cart.find(
    i =>
      i.id === Number(id) &&
      i.size === size
  );

  if(!item) return;

  item.quantity += delta;

  if(item.quantity <= 0){

    cart = cart.filter(
      i =>
        !(
          i.id === Number(id) &&
          i.size === size
        )
    );

  }

  saveCart();

}


// ==========================================
// REMOVER
// ==========================================

function removeFromCart(id,size){

  cart = cart.filter(
    i =>
      !(
        i.id === Number(id) &&
        i.size === size
      )
  );

  saveCart();

}


// ==========================================
// CARD DO PRODUTO
// ==========================================

function productCard(product){

  return `
    <article class="product">

      <img
        class="product-img"
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
      >

      <div class="product-info">

        <p class="product-category">
          ${product.label}
        </p>

        <h3>
          ${product.name}
        </h3>

        <p class="price">
          ${money(product.price)}
        </p>

        <a
          class="text-link"
          href="produto.html?id=${product.id}"
        >
          Ver detalhes →
        </a>

        <br><br>

        <button
          class="add"
          data-add-product="${product.id}"
        >
          Adicionar ao carrinho
        </button>

      </div>

    </article>
  `;

}


// ==========================================
// MOSTRAR PRODUTOS
// ==========================================

function renderProducts(){

  const featured =
    document.getElementById(
      "featuredProducts"
    );

  if(featured){

    featured.innerHTML =
      products
        .slice(0,3)
        .map(productCard)
        .join("");

  }


  const all =
    document.getElementById(
      "allProducts"
    );

  if(all){

    function render(list){

      all.innerHTML =
        list
          .map(productCard)
          .join("");

    }

    render(products);


    document
      .querySelectorAll(".filter")
      .forEach(button=>{

        button.addEventListener(
          "click",
          ()=>{

            document
              .querySelectorAll(".filter")
              .forEach(btn=>{
                btn.classList.remove(
                  "active"
                );
              });

            button.classList.add(
              "active"
            );

            const filter =
              button.dataset.filter;

            if(filter === "todos"){

              render(products);

            }else{

              render(
                products.filter(
                  p =>
                    p.category === filter
                )
              );

            }

          }
        );

      });

  }

}


// ==========================================
// CLIQUES DOS BOTÕES
// ==========================================

document.addEventListener(
  "click",
  function(event){

    const button =
      event.target.closest(
        "[data-add-product]"
      );

    if(button){

      const id =
        button.dataset.addProduct;

      addToCart(id);

    }

  }
);


// ==========================================
// MENU ☰
// ==========================================

function setupMenu(){

  const button =
    document.getElementById("menuBtn");

  const nav =
    document.getElementById("nav");

  if(!button || !nav) return;


  button.addEventListener(
    "click",
    function(){

      nav.classList.toggle("show");

    }
  );


  nav.querySelectorAll("a")
    .forEach(link=>{

      link.addEventListener(
        "click",
        ()=>{
          nav.classList.remove("show");
        }
      );

    });

}


// ==========================================
// CARRINHO FLUTUANTE
// ==========================================

function createFloatingCart(){

  if(
    document.getElementById(
      "cherry-floating-cart"
    )
  ){
    return;
  }

  const button =
    document.createElement("button");

  button.id =
    "cherry-floating-cart";

  button.innerHTML = `
    🛍️
    <span
      class="cart-number"
      id="floatingCartCount"
    >
      ${getCartQuantity()}
    </span>
  `;

  button.setAttribute(
    "aria-label",
    "Abrir carrinho"
  );

  button.addEventListener(
    "click",
    function(){

      window.location.href =
        "carrinho.html";

    }
  );

  document.body.appendChild(button);

}


// ==========================================
// PÁGINA DO CARRINHO
// ==========================================

function renderCartPage(){

  const area =
    document.getElementById(
      "cartPageItems"
    );

  const totalEl =
    document.getElementById(
      "cartPageTotal"
    );

  if(!area) return;


  if(cart.length === 0){

    area.innerHTML = `
      <div class="cart-row">
        <p>
          Seu carrinho está vazio. 🍒
        </p>
      </div>
    `;

    if(totalEl){
      totalEl.textContent =
        money(0);
    }

    return;

  }


  area.innerHTML =
    cart.map(item=>`

      <div class="cart-row">

        <img
          src="${item.image}"
          alt="${item.name}"
        >

        <div class="cart-row-info">

          <h3>
            ${item.name}
          </h3>

          <p>
            Tamanho: ${item.size}
          </p>

          <p>
            ${money(item.price)}
          </p>

          <div class="qty">

            <button
              onclick="changeQuantity(${item.id}, '${item.size}', -1)"
            >
              −
            </button>

            <strong>
              ${item.quantity}
            </strong>

            <button
              onclick="changeQuantity(${item.id}, '${item.size}', 1)"
            >
              +
            </button>

          </div>

          <button
            class="remove"
            onclick="removeFromCart(${item.id}, '${item.size}')"
          >
            Remover
          </button>

        </div>

      </div>

    `).join("");


  const total =
    cart.reduce(
      (sum,item)=>
        sum +
        item.price *
        item.quantity,
      0
    );


  if(totalEl){
    totalEl.textContent =
      money(total);
  }

}


// ==========================================
// INICIAR
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  function(){

    renderProducts();

    renderCartPage();

    createFloatingCart();

    updateCartCount();

    setupMenu();

  }
);