// Carrinho de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Função para adicionar produto ao carrinho
function addToCart(productName, price, imageSrc) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            image: imageSrc,
            quantity: 1
        });
    }
    saveCart();
    updateCartUI();
}

// Função para remover produto do carrinho
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    saveCart();
    updateCartUI();
}

// Função para atualizar quantidade
function updateQuantity(productName, newQuantity) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity = newQuantity;
        if (product.quantity <= 0) {
            removeFromCart(productName);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

// Função para salvar carrinho no localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Função para calcular total
function getTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Função para atualizar UI do carrinho
function updateCartUI() {
    const cartButton = document.querySelector('.cart button');
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartButton.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> ${cartCount > 0 ? `(${cartCount})` : ''}`;

    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        cartItems.innerHTML = '';
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>R$ ${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity('${item.name}', ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity('${item.name}', ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remover</button>
            `;
            cartItems.appendChild(itemElement);
        });

        cartTotal.textContent = `Total: R$ ${getTotal().toFixed(2)}`;
    }
}

// Função para abrir modal do carrinho
function openCartModal() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.style.display = 'block';
        updateCartUI();
    }
}

// Função para fechar modal do carrinho
function closeCartModal() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.style.display = 'none';
    }
}

// Inicializar carrinho na carga da página
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});
