const home_btn = document.querySelector('#home-btn')
const mouse_btn = document.querySelector('#mouse-btn')
const keyboard_btn = document.querySelector('#keyboard-btn')
const headset_btn = document.querySelector('#headset-btn')
const chair_btn = document.querySelector('#chair-btn')
const allproducts = document.querySelector('.produtos')
const title = document.querySelector('.title')
const cartButton = document.querySelector('.cart button')

function navItems(){
    const navItems = document.querySelectorAll('.navbtn')
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(item => item.classList.remove('active'))
            item.classList.add('active')
        })
    })
}

function criarCards(categoria) {
    // Encontra a categoria no array data
    const categoriaData = data.find(item => item.categoria === categoria);
    
    if (!categoriaData) {
        console.error('Categoria não encontrada');
        return;
    }
    
    // Seleciona o container onde os cards vão aparecer
    const container = document.querySelector('.produtos-container');
    
    // Limpa o container antes de adicionar novos cards
    container.innerHTML = '';
    
    // Para cada produto da categoria, cria um card
    categoriaData.nome.forEach((nomeProduto, index) => {
        const preco = categoriaData.preco[index];
        
        // Cria o HTML do card
        const card = `
            <div class="produto-card">
                <img src="src/assets/${categoria}/${nomeProduto.toLowerCase().replace(/ /g, '')}.png" 
                     alt="${nomeProduto}">
                <div class="produto-card-info">
                    <h3>${nomeProduto}</h3>
                    <span>R$ ${preco.toFixed(2)}</span>
                </div>
                <button>Comprar</button>
            </div>
        `;
        
        // Adiciona o card ao container
        container.innerHTML += card;
        container.style.display = 'flex'
        container.style.flexWrap = 'wrap'
    });
    title.innerHTML = categoriaData.categoria;
    title.style.textTransform = 'capitalize'
}

function mostrarTodosProdutos() {
    const container = document.querySelector('.produtos-container');
    container.innerHTML = '';
    
    // Percorre todas as categorias
    data.forEach(categoria => {
        // Para cada produto da categoria
        categoria.nome.forEach((nomeProduto, index) => {
            const preco = categoria.preco[index];
            
            const card = `
                <div class="produto-card">
                    <img src="src/assets/${categoria.categoria}/${nomeProduto.toLowerCase().replace(/ /g, '')}.png" 
                         alt="${nomeProduto}">
                    <div class="produto-card-info">
                        <h3>${nomeProduto}</h3>
                        <span>R$ ${preco.toFixed(2)}</span>
                    </div>
                    <button>Comprar</button>
                </div>
            `;
            
            container.innerHTML += card;
            container.style.display = 'grid'
            container.style.gridTemplateColumns = 'repeat(4, 1fr)'
            container.style.gridTemplateRows = 'repeat(2, 1fr)'
            container.style.gap = '20px'
        });
    });
    title.innerHTML = 'Todos os produtos';
    title.style.textTransform = 'none'
}

mostrarTodosProdutos()
navItems()

// Event listener para o botão do carrinho
cartButton.addEventListener('click', openCartModal)

// Função para adicionar event listeners aos botões "Comprar"
function addBuyButtonListeners() {
    const buyButtons = document.querySelectorAll('.produto-card button');
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.produto-card');
            const productName = card.querySelector('h3').textContent;
            const priceText = card.querySelector('span').textContent;
            const price = parseFloat(priceText.replace('R$ ', '').replace(',', '.'));
            const imageSrc = card.querySelector('img').src;

            addToCart(productName, price, imageSrc);
            
        });
    });
}

// Chama a função para adicionar listeners após carregar produtos
addBuyButtonListeners();

home_btn.addEventListener('click', () => {
    mostrarTodosProdutos();
    // Re-adiciona listeners após recarregar produtos
    setTimeout(addBuyButtonListeners, 100);
})
mouse_btn.addEventListener('click', () =>   {
    criarCards('mouses');
    setTimeout(addBuyButtonListeners, 100);
})
keyboard_btn.addEventListener('click', () => {
    criarCards('teclados');
    setTimeout(addBuyButtonListeners, 100);
})
headset_btn.addEventListener('click', () => {
    criarCards('headsets');
    setTimeout(addBuyButtonListeners, 100);
})
chair_btn.addEventListener('click', () => {
    criarCards('cadeiras');
    setTimeout(addBuyButtonListeners, 100);
})
