document.addEventListener('DOMContentLoaded', () => {
    const cart = []; // Массив для хранения товаров
    const cartListElement = document.getElementById('cart-list');
    const submitBtn = document.getElementById('submit-order-btn');
    const checkoutForm = document.getElementById('checkout-form');
    const successMsg = document.getElementById('success-message');

    // Функция обновления отображения корзины
    function renderCart() {
        cartListElement.innerHTML = ''; // Очищаем список

        if (cart.length === 0) {
            cartListElement.innerHTML = '<li class="empty-cart-msg">Корзина пока пуста</li>';
            submitBtn.disabled = true; // Блокируем кнопку, если пусто
            return;
        }

        // Рендерим каждый товар
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name}</span>
                <span class="remove-btn" data-index="${index}">✕</span>
            `;
            cartListElement.appendChild(li);
        });

        submitBtn.disabled = false; // Разблокируем кнопку
    }

    // Обработчик клика по кнопкам "Добавить"
    const addButtons = document.querySelectorAll('.add-to-cart-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const itemName = e.target.getAttribute('data-name');
            cart.push({ name: itemName });
            renderCart();
            
            // Анимация кнопки (визуальный отклик)
            const originalText = e.target.innerText;
            e.target.innerText = 'Добавлено!';
            e.target.style.background = 'var(--color-primary)';
            e.target.style.color = 'white';
            
            setTimeout(() => {
                e.target.innerText = originalText;
                e.target.style.background = '';
                e.target.style.color = '';
            }, 1000);
        });
    });

    // Обработчик удаления из корзины (делегирование событий)
    cartListElement.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1); // Удаляем 1 элемент по индексу
            renderCart();
        }
    });

    // Обработка отправки формы
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        
        // Скрываем форму, показываем сообщение об успехе
        checkoutForm.classList.add('hidden');
        successMsg.classList.remove('hidden');
        
        // Очищаем корзину после заказа (опционально)
        cart.length = 0; 
        renderCart();
    });
});
