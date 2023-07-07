//create classes 
class Database {
    constructor() {
        this.products = [];
        this.insertProduct(1, "Calza deportiva", 15000, "indumentaria", "calzaRunning.png");
        this.insertProduct(2, "Botella térmica", 8000, "accesorios", "botella.png");
        // this.insertProduct(3, "Zapatillas para trail running", 65000, "calzado", "zapaz.png");
        // this.insertProduct(4, "Campera", 20000, "indumentaria", "campera.png");
        // this.insertProduct(5, "Esterilla yoga", 6800, "accesorios", "esterilla.png");
        // this.insertProduct(6, "Medias de compresión", 4500, "indumentaria", "medias.png");
        // this.insertProduct(7, "Mochila Trail running", 45000, "accesorios", "mochila.png");
        // this.insertProduct(8, "Musculosa lycra", 8000, "indumentaria", "musculosa.png");
        // this.insertProduct(9, "Bastones de trekking", 10000, "accesorios", "palos.png");
        // this.insertProduct(10, "Remera deportiva mujer", 15000, "indumentaria", "remera.png");
        // this.insertProduct(11, "riñonera deportiva", 6500, "accesorios", "riñonera.png");
        // this.insertProduct(12, "Zapatillas con base de caucho", 50000, "calzado", "zapatilas.png");
    }


    insertProduct(id, name, price, type, image) {
        const product = new Product(id, name, price, type, image);
        this.products.push(product);

    }

    getProducts() {
        return this.products;
    }

    findProductById(id) {

        return this.products.find((product) => product.id === id);
    }

    putProduct(id, Product) {
        let oldProduct = this.products.find((oldProduct) => oldProduct.id === id);
        Product.id = id;
        let changedProduct = Product;
        return changedProduct;
    }
    deleteProduct(id) {
        let product = this.products.find(id);
        product.deleteProduct(id);
    }

}


class ShoppingCart {
    constructor() {
        this.shoppingCart = [];
        this.total = 0;
        this.totalProducts = 0;
    }

    isInTheCart({ id }) {
        return this.shoppingCart.find((product) => product.id === id);
    }

    addProductToTheCart(product) {
        let productInCart = this.isInTheCart(product);
        if (productInCart) {
            productInCart.cant++;
            console.log("entra en el if");
        } else {
            console.log("entra en el else");
            this.shoppingCart.push({ ...product, cant: 1 });
        }
        this.loadShoppingCart();
    }
    deleteProduct(id) {
        const arrayIndex = this.shoppingCart.findIndex((product) => product.id === id);
        console.log(arrayIndex);
        if (this.shoppingCart[arrayIndex].cant > 1) {
            this.shoppingCart[arrayIndex].cant--;
            console.log("more than one")
        } else {
            this.shoppingCart.splice(arrayIndex, 1); //allow desapear one product in the array (the amount depends of the second parameter) 
        }
        this.loadShoppingCart();
    }

    loadShoppingCart() {
        this.total = 0;
        this.totalProducts = 0;
        divShoppingCart.innerHTML = "";
        for (const product of this.shoppingCart) {
            let pricePrduct = product.price * product.cant;
            this.total = this.total + pricePrduct;
            this.totalProducts = this.totalProducts + product.cant;
            divShoppingCart.innerHTML += `
            <div class="product shoppingCartStyle">
            <h2>${product.name}</h2>
            <p>Precio Unitario: $${product.price}</p>
            <p>Subtotal $${pricePrduct}</p>
            <p>Cantidad: ${product.cant}</p>"
            <a href="#" data-id="${product.id}" class="btnDelete btn btn-warning" >Eliminar producto</a>
            </div>
            `;
        }
        const deleteButton = document.querySelectorAll(".btnDelete");
        for (const button of deleteButton) {
            button.onclick = (event) => {
                event.preventDefault();
                this.deleteProduct(Number(button.dataset.id));
            };

        }

        spanTotal.innerText = this.total;
        spanAmountProducts.innerText = this.totalProducts;

    }
}


class Product {
    constructor(id, name, price, type, image = false) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.type = type;
        this.image = image;

    }
}

//load products 
const db = new Database();

const divProducts = document.querySelector("#products");
const divShoppingCart = document.querySelector("#shoppingCart")
const spanTotal = document.querySelector("#total");
const spanAmountProducts = document.querySelector("#amountProducts")

loadProducts();

function loadProducts() {
    const products = db.getProducts();
    divProducts.innerHTML = "";
    for (const product of products) {
        divProducts.innerHTML += `
      
         <div class="card cards ">
          <img class="card-img-top" src="../img/${product.image}" width= "140" alt="Card image cap">
           <div class="card-body"> 
           <h5 class="card-title">${product.name}</h5> 
           <p class="card-text">$  ${product.price}</p> 
           <a href="#" data-id="${product.id}" 
           class="btn btn-warning btnAdd">Agregar al carrito</a> </div>  `
            ;
    }

    const btnAdds = document.querySelectorAll(".btnAdd");
    for (const button of btnAdds) {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const product = db.findProductById(Number(button.dataset.id));
            alert("Agregaste al carrito el producto " + product.name);
            shoppingCart.addProductToTheCart(product);
        });
    }
}

const shoppingCart = new ShoppingCart();


