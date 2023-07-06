
createDatabase();
class Product {
    constructor(id, name, price, type, image = false) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.type = type;
        this.image = image;
    }
}

class Database {
    constructor() {
        this.products = [];
        this.insertProduct(1, "Calza deportiva", 15000, "indumentaria", "calzaRunning.png");
        this.insertProduct(2, "Botella térmica", 8000, "accesorios", "botella.png");
        this.insertProduct(3, "Zapatillas para trail running", 65000, "calzado", "zapaz.png");
        this.insertProduct(4, "Campera", 20000, "indumentaria", "campera.png");
        this.insertProduct(5, "Esterilla yoga", 6800, "accesorios", "esterilla.png");
        this.insertProduct(6, "Medias de compresión", 4500, "indumentaria", "medias.png");
        this.insertProduct(7, "Mochila Trail running", 45000, "accesorios", "mochila.png");
        this.insertProduct(8, "Musculosa lycra", 8000, "indumentaria", "musculosa.png");
        this.insertProduct(9, "Bastones de trekking", 10000, "accesorios", "palos.png");
        this.insertProduct(10, "Remera deportiva mujer", 15000, "indumentaria", "remera.png");
        this.insertProduct(11, "riñonera deportiva", 6500, "accesorios", "riñonera.png");
        this.insertProduct(12, "Zapatillas con base de caucho", 50000, "calzado", "zapatillas.png");
        console.log(this.products)
    }

    insertProduct(id, name, price, type, image) {
        const product = new Product(id, name, price, type, image);
        this.products.push(product);

    }

    getProducts() {
        return this.products;
    }

    findProductById () {

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

 function createDatabase() {
 const db = new Database();
}

const divProducts = document.querySelector("#products");
function loadProducts() {
    const products = db.getProducts();
    for(const product of products) {
        divProducts.innerHTML += 
        `
        <div class="product">
        <h2> ${product.name} </h2>
        <p> ${product.price} </p>
        <img src="img/${product.image}></img>
        <p> <a href="#">Agregar al carrito </a></p>
        `;
    }
}
