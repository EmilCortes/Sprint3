// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
let products = [
    {
        id: 1,
        name: 'Cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 10 / 10.5
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 2 / 3
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
let cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
let cart = [];

let total = 0;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    for (let i = 0; i < products.length; i++) {
        const product = products[i]
        if (product.id === id) {
            // 2. Add found product to the cartList array        
            cartList.push(product)
            calculateTotal(cartList)
        }
    }
    document.getElementById("count_product").innerHTML = cartList.length
}

// Exercise 2
function cleanCart() {

    cartList = []
    cart = []

    printCart()

    document.getElementById("count_product").innerHTML = cartList.length
    document.getElementById("total_price").innerHTML = "0"

}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array

    total = 0

    for (let i = 0; i < cartList.length; i++) {
        const element = cartList[i]
        total += element.price
    }
    document.getElementById('total_price').innerHTML = total.toFixed(2)
}

// Exercise 4
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.

    cart = []

    for (let i = 0; i < cartList.length; i++) {
        const product = cartList[i]

        const productIndex = cart.findIndex((productInCart) => productInCart.id === product.id)

        if (productIndex === -1) {
            product.quantity = 1
            cart.push(product)
        } else {
            cart[productIndex].quantity += 1
        }
    }
}

// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"

    total = 0

    for (let i = 0; i < cart.length; i++) {

        let product = cart[i]

        if (product.hasOwnProperty("offer") && product.quantity >= product.offer.number) {
            product.subtotalWithDiscount = product.quantity * product.price * product.offer.percent
            total += product.subtotalWithDiscount
        } else {
            product.subtotalWithDiscount = product.quantity * product.price
            total += product.subtotalWithDiscount
        }
    }

    document.getElementById('total_price').innerHTML = total.toFixed(2)

}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom

    applyPromotionsCart()

    let printedCart = []

    for (let i = 0; i < cart.length; i++) {
        const product = cart[i]
        printedCart.push(
            `<tr>
            <th>${product.name}</th>
            <td>${product.price}</td> 
            <td>${product.quantity}</td>
            <td>${product.subtotalWithDiscount.toFixed(2)}</td>
            <td><a type="button" onclick="removeFromCart(${product.id})">
            <i class="fa fa-trash" aria-hidden="true"></i></a></td>
            </tr>`)
    }
    document.getElementById("cart_list").innerHTML = printedCart.join('')

}


// ** Nivell II **

// Exercise 8
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.

    const product = products.find((product) => product.id === id) //Se guarda en variable el producto que buscamos en el array products

    if (product) { //Si se encuentra el producto...
        const productIndex = cart.findIndex((productInCart) => productInCart.id === product.id)//...se verifica si existe en el carrito

        if (productIndex === -1) {//Si el producto no existe en el carrito...
            product.quantity = 1 //...se le asigna su propiedad quantity a 1.
            cart.push(product) //y se pushea al array de cart
        } else {
            cart[productIndex].quantity += 1 //Si ya existe en el carrito, se le suma 1 e iguala su quantity.
        }

        cartList.push(product) //Se hace push a cartList para aumentar el contador del innerHTML de dos líneas mas abajo.
        calculateTotal(cartList) //Se realizan los calculos necesarios con la función de calcular total, ya que esta tambien imprime el total en pantalla.
        document.getElementById("count_product").innerHTML = cartList.length
    }
}

// Exercise 9
function removeFromCart(id) {

    const cartIndex = cart.findIndex((item) => item.id === id) //Busca el elemento en el array cart
    const cartListIndex = cartList.findIndex((item) => item.id === id) //Busca el elemento en el array cartList

    if (cartIndex !== -1 && cartListIndex !== -1) {
        if (cart[cartIndex].quantity > 1) {
            cart[cartIndex].quantity -= 1
        } else {
            cart.splice(cartIndex, 1)
        }
        cartList.splice(cartListIndex, 1)
    }

    printCart()
    document.getElementById("count_product").innerHTML = cartList.length //hace que el contador se mantenga con el número de items agregados al carro, y no con el número de posiciones del arrray cart.

}

//Funcion para abrir la lista del carrito en su respectivo icono.
function open_modal() {
    console.log("Open Modal")
    generateCart()
    printCart()
}



//Código utilizado para mantener la barra de Navbar arriba de la pantalla al hacer Scroll.
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".fixed-navbar")
    if (window.pageYOffset > 0) {
        navbar.classList.add("fixed-top")
    } else {
        navbar.classList.remove("fixed-top")
    }
})