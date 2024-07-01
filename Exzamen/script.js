// Класс для представления товара
class Product {
    constructor(code, name, unit, price) {
        this.code = code; // Код товара
        this.name = name; // Наименование товара
    }
}

// Класс для представления модели
class Department {
    constructor(id, name, manager, phone, volume) {
        this.id = id; // Код модели
        this.name = name; // Наименование модели
        this.unit = unit; // Единица измерения товара
        this.price = price; // Розничная цена товара (тыс. руб.)
    }
}

// Класс для представления поступления
class Sale {
    constructor(id, productCode, date, quantity) {
        this.id = id; // Код Поступления
        this.productCode = productCode; // Код модели
        this.date = date; // Дата поступления модели товара
        this.quantity = quantity; // Количество товара
        this.manager = manager; // Кто принял товар
    }
}

// Загрузка данных из localStorage или инициализация пустыми массивами
let departments = JSON.parse(localStorage.getItem('departments')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];
let sales = JSON.parse(localStorage.getItem('sales')) || [];

// Функция для сохранения данных в localStorage
function saveData() {
    localStorage.setItem('departments', JSON.stringify(departments));
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('sales', JSON.stringify(sales));
}

// Функция для добавления новой модели
function addDepartment() {
    const id = Date.now(); // Генерация уникального ID на основе текущего времени
    const name = prompt("Наименование модели:");
    const manager = prompt("Ф.И.О. заведующего:");
    const phone = prompt("Телефон:");
    const volume = parseFloat(prompt("Объем реализации в день (руб.):"));

    if (name && manager && phone && !isNaN(volume)) {
        departments.push(new Department(id, name, manager, phone, volume));
        saveData();
        loadDepartments();
    }
}

// Функция для обновления данных модели
function updateDepartment() {
    const id = parseInt(prompt("ID модели для обновления:"), 10);
    const department = departments.find(d => d.id === id);
    if (department) {
        department.name = prompt("Наименование модели:", department.name);
        loadDepartments();
    }
}

// Функция для удаления модели
function deleteDepartment() {
    const id = parseInt(prompt("ID модели для удаления:"), 10);
    departments = departments.filter(d => d.id !== id);
    saveData();
    loadDepartments();
}

// Функция для добавления нового товара
function addProduct() {
    const code = prompt("Код товара:");
    const name = prompt("Наименование товара:");
    const unit = prompt("Единица измерения:");
    const price = parseFloat(prompt("Розничная цена товара (руб.):"));

    if (code && name && unit && !isNaN(price)) {
        products.push(new Product(code, name, unit, price));
        saveData();
        loadProducts();
    }
}

// Функция для обновления данных товара
function updateProduct() {
    const code = prompt("Код товара для обновления:");
    const product = products.find(p => p.code === code);
    if (product) {
        product.name = prompt("Наименование товара:", product.name);
        product.unit = prompt("Единица измерения:", product.unit);
        product.price = parseFloat(prompt("Розничная цена товара (руб.):", product.price));
        saveData();
        loadProducts();
    }
}

// Функция для удаления товара
function deleteProduct() {
    const code = prompt("Код товара для удаления:");
    products = products.filter(p => p.code !== code);
    saveData();
    loadProducts();
}

// Функция для добавления новой продажи
function addSale() {
    const id = Date.now(); // Генерация уникального ID на основе текущего времени
    const productCode = prompt("Код товара:");
    const date = prompt("Дата продажи (гггг-мм-дд):");
    const quantity = parseInt(prompt("Количество Поступленного товара:"), 10);

    if (productCode && date && !isNaN(quantity)) {
        sales.push(new Sale(id, productCode, date, quantity));
        saveData();
        loadSales();
    }
}

// Функция для обновления данных поступления
function updateSale() {
    const id = parseInt(prompt("ID Поступления для обновления:"), 10);
    const sale = sales.find(s => s.id === id);
    if (sale) {
        sale.productCode = prompt("Код товара:", sale.productCode);
        sale.date = prompt("Дата поступления (гггг-мм-дд):", sale.date);
        sale.quantity = parseInt(prompt("Количество поступления модели товара:", sale.quantity), 10);
        saveData();
        loadSales();
    }
}

// Функция для удаления продажи
function deleteSale() {
    const id = parseInt(prompt("ID продажи для удаления:"), 10);
    sales = sales.filter(s => s.id !== id);
    saveData();
    loadSales();
}

// Функция для загрузки и отображения данных отделов
function loadDepartments() {
    const container = document.getElementById('departments');
    container.innerHTML = '<ul>' + departments.map(d => `<li>${d.id} - ${d.name} - ${d.manager} - ${d.phone} - ${d.volume} руб.</li>`).join('') + '</ul>';
}

// Функция для загрузки и отображения данных товаров
function loadProducts() {
    const container = document.getElementById('products');
    container.innerHTML = '<ul>' + products.map(p => `<li>${p.code} - ${p.name} - ${p.unit} - ${p.price} руб.</li>`).join('') + '</ul>';
}

// Функция для загрузки и отображения данных продаж
function loadSales() {
    const container = document.getElementById('sales');
    container.innerHTML = '<ul>' + sales.map(s => `<li>${s.id} - ${s.productCode} - ${s.date} - ${s.quantity}</li>`).join('') + '</ul>';
}

// Обработчик события загрузки DOM для инициализации данных
document.addEventListener('DOMContentLoaded', () => {
    loadDepartments();
    loadProducts();
    loadSales();
});