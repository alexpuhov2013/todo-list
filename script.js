const form = document.querySelector('#item-form');
const input = document.querySelector('#item-input');
const list = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filter = document.querySelector('#filter')
const formBtn = document.querySelector(".btn")
let isEdit = false

document.addEventListener('DOMContentLoaded', (e) => {
  // Получим элементы из localStorage
  const itemsFromStorage = getItemsFromStorage();
  // Для каждого элемента вызываем функцию addItemToDOM
  itemsFromStorage.forEach(item => addItemToDOM(item));
  // Обновляем интерфейс
  checkUI();
})

form.addEventListener('submit', (e) => {
  // Отмена стандартного поведения
  e.preventDefault();

  // Валидация инпута
  if(input.value === '') {
    alert('Пожалуйста заполните поле');
    return;
  };

  // Переменная для нового элемента
  const newItem = input.value;

  if (isEdit) {
    const itemToEdit = list.querySelector(".edit-mode")
    removeItemFromStorage(itemToEdit.textContent)
    itemToEdit.remove()
    isEdit = false
  } else{
    if (checkIfItemExist(newItem)) {
      alert("Покупка уже есть")
      return
    }
  }

  // Добавляем элемент в DOM
  addItemToDOM(newItem);

  // Сохраняем в localStorage
  addItemToStorage(newItem);

  // Обновляем интерфейс (User Interface)
  checkUI();

  // Очищаем поле для ввода (input)
  input.value = '';
});

list.addEventListener('click', (e) => {

  // Если родитель e.target содержит класс 'remove-item'
  if(e.target.parentElement.classList.contains('remove-item')) {

    // Найти ближайший родительский li и удалить его
    removeItem(e.target.closest('li'));
  } else if(e.target.closest("li")){
    setItemToEdit(e.target.closest("li"))
  }
})

function setItemToEdit(item) {
    isEdit = true;

    const listItems = document.querySelectorAll("li")
    listItems.forEach((li) => li.classList.remove("edit-mode"))
    item.classList.add("edit-mode")

    formBtn.innerHTML = ` <i" class="fa-solid fa-pencil fa-beat-fade" style="color: #FFD43B;"</i> Редактировать`
    formBtn.style.backgroundColor = "green"

    input.value = item.textContent
}

function removeItem(item){
  if(confirm('Вы уверены?')) {
    // Удалить элемент из DOM
    item.remove();

    // Стираем значение из localStorage
    removeItemFromStorage(item.textContent);

    if (item.classList.contains("edit-mode")) {
      input.value = ""
    checkUI();
    }

    // Обновляем интерфейс
    checkUI(false);
    
  }
}

function removeItemFromStorage(item){
  // Получим элементы из localStorage
  let itemsFromStorage = getItemsFromStorage();
  
  // Используем фильтр для удаления 'item' из массива
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item)

  // Сохранить массив в localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

clearBtn.addEventListener('click', (e) => {
  if(confirm('Вы уверены?')) {
    // Очистим HTML код внутри списка
    list.innerHTML = '';

    // Очистим из localStorage
    localStorage.removeItem('items');

    checkUI();
  }
})

filter.addEventListener('input', (e) => {
  // Получим значение из инпута (в нижнем регистре)
  const text = e.target.value.toLowerCase();
  // Получим элементы из списка
  const items = list.querySelectorAll('li');

  // Перебираем все элементы из списка
  items.forEach((item) => {
    // Получим название (нижнем регистре)
    const itemText = item.innerText.toLowerCase();

    if (itemText.indexOf(text) !== -1) {
      // Отобразить совпадение в списке
      item.style.display = 'flex';
    } else {
      // Скрыть неподходящий элемент
      item.style.display = 'none';
    }
  })

})

function createIcon(classes){
  // Создадим элемент (i)
  const icon = document.createElement('i');
  // Присвоим классы для атрибута class
  icon.className = classes;
  // Вернем полученный элемент
  return icon;
}

function createButton(classes){
  // Создадим элемент (button)
  const button = document.createElement('button');
  // Присвоим классы для атрибута class
  button.className = classes;
  // Создадим иконку для кнопки
  const icon = createIcon('fa-solid fa-xmark')
  // Вставляем иконку в кнопку
  button.appendChild(icon);
  // Вернем полученную кнопку
  return button;
}

function checkUI(resetEdit = true){
  // Получим все элементы внутри списка
  const items = list.querySelectorAll('li');

  // Если в списке нет элементов
  if(items.length === 0) {
    // Выключим отображение (display: none)
    clearBtn.style.display = 'none';
    filter.style.display = 'none';
  } else {
    // В обратном случае
    // Включим отображение (display: block)
    clearBtn.style.display = 'block';
    filter.style.display = 'block';
  }

  if(resetEdit){
  formBtn.innerHTML = ` <i" class="fa-solid fa-plus"</i> Добавить`
  formBtn.style.backgroundColor = "#333333"

  isEdit = false
  }

}

function addItemToDOM(item){
  // Создание (li) элемента и текста внутри
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  
  // Создадим кнопку с помощью функции
  const button = createButton('remove-item btn-link text-red');
  
  // Вставляем кнопку внутри li
  li.appendChild(button);

  // Добавляем элемент (li) в список
  list.appendChild(li);
}

function addItemToStorage(item){
  // Получаем элементы из localStorage
  const itemsFromStorage = getItemsFromStorage();

  // Добавляем новый элемент в список (массив)
  itemsFromStorage.push(item);

  // Сохраняем массив в localStorage в виде JSON строки (string)
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage(){
  // Создаем пустую переменную (внутри undefined)
  let itemsFromStorage;

  // Если в localStorage не существует ключа items
  if(localStorage.getItem('items') === null) {
  // Инициализируем пустой массив для элементов
    itemsFromStorage = [];

  } else {
    // Если элементы уже есть - парсим данные

    // Правильно ✅ Парсим JSON данные в виде массива
    itemsFromStorage = JSON.parse(localStorage.getItem('items'))

    // Неправильно ❌ Получаем строку в виде JSON
    // itemsFromStorage = localStorage.getItem('item') 
  }

  return itemsFromStorage;
}

function checkIfItemExist(item) {
  const itemsFromStorage = getItemsFromStorage()

  if (itemsFromStorage.includes(item)) {
    return true 
  } else{
    return false
  }

}

checkUI();