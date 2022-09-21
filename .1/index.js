
// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
let temp;
const minWeight = document.querySelector('.minweight__input');
const maxWeight = document.querySelector('.maxweight__input');

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
   ]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек

const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML='';
   
  for (let i = 0; i <fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    let newFruit = document.createElement("li");
        newFruit.classList.add("fruit__item");
        if (fruits[i].color=="фиолетовый"){
          newFruit.classList.add("fruit_violet");
        } else 
        if (fruits[i].color=="зеленый"){
          newFruit.classList.add("fruit_green");
        } else 
        if (fruits[i].color=="розово-красный"){
          newFruit.classList.add("fruit_carmazin");
        } else
        if (fruits[i].color=="желтый"){
          newFruit.classList.add("fruit_yellow");
        } else
        if (fruits[i].color=="светло-коричневый"){
          newFruit.classList.add("fruit_lightbrown");
        } else 
          newFruit.classList.add("fruit_black");
        
        
    let fruitInfo=document.createElement("div");
        fruitInfo.classList.add("fruit__info");

    let indexFruit=document.createElement("div"),
        indexFruitContent=document.createTextNode("index: "+i); 
        indexFruit.appendChild(indexFruitContent); 

    let kindFruit=document.createElement("div"),
        kindFruitContent=document.createTextNode("kind: "+fruits[i].kind);
        kindFruit.appendChild(kindFruitContent);

    let colorFruit=document.createElement("div"),
        colorFruitContent=document.createTextNode("color: "+fruits[i].color);
        colorFruit.appendChild(colorFruitContent);

    let weightFruit=document.createElement("div"),
        weightFruitContent=document.createTextNode("weight (кг): "+fruits[i].weight);
        weightFruit.appendChild(weightFruitContent);

   fruitInfo.appendChild(indexFruit);
   fruitInfo.appendChild(kindFruit);
   fruitInfo.appendChild(colorFruit);
   fruitInfo.appendChild(weightFruit);
      
   newFruit.appendChild(fruitInfo);
   fruitsList.appendChild(newFruit);
  }
};
// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (max) => {
  //return Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.floor(Math.random() * max) ;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let r=0;
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let f=getRandomInt(fruits.length);
        result.splice(r++,0,fruits[f]);
        fruits.splice(f,1);
  }
  
  if (fruits===result) {
    alert("Элементы не перемешались! Попробуйте еще раз!")
  }
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
  sortTimeLabel.textContent ='-';
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let weightMin = (minWeight.value);
  let weightMax = (maxWeight.value);
  
let filteredFruits = fruits.filter((item) => {
   return item.weight>=weightMin&&item.weight<=weightMax;
   
  });
  temp=fruits;
  fruits=filteredFruits;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
  fruits=temp;
  });

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки
let priorityColor = ['желтый', 'зеленый', 'розово-красный', 'светло-коричневый', 'фиолетовый']; // эталон сортировки по цвету

//функция сравнения двух элементов по цвету

const comparationColor = (color1, color2) => {
    const priority1 = priorityColor.indexOf(color1.color);
    const priority2 = priorityColor.indexOf(color2.color);
    return priority1 > priority2;
};

const sortAPI = {

  // сортировка пузырьком
  bubbleSort(arr, comparationColor) {
       const n = arr.length;
       // внешняя итерация по элементам
       for (let i = 0; i < n-1; i++) { 
           // внутренняя итерация для перестановки элемента в конец массива
           for (let j = 0; j < n-1-i; j++) { 
               // сравниваем элементы
               if (comparationColor(arr[j], arr[j+1])) { 
                   // делаем обмен элементов
                   let temp = arr[j+1]; 
                   arr[j+1] = arr[j]; 
                   arr[j] = temp; 
               }
           }
       }                    
  },

 // quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    // функция обмена элементов
swap(arr, firstIndex, secondIndex){
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
},

// функция разделитель
partition(arr, left, right) {
  var pivot = arr[Math.floor((right + left) / 2)],
      i = left,
      j = right;
  while (i <= j) {
      while /*(items[i] < pivot)*/(comparationColor(arr[i],pivot)) {
          i++;
      }
      while /*(items[j] > pivot)*/(comparationColor(pivot,arr[j])) {
          j--;
      }
      if (i <= j) {
          swap(arr, i, j);
          i++;
          j--;
      }
  }
  return i;
},

// алгоритм быстрой сортировки
quickSort(arr, left, right) {
  var index;
  if (arr.length > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? arr.length - 1 : right;
      index = partition(arr, left, right);
      if (left < index - 1) {
          quickSort(arr, left, index - 1);
      }
      if (index < right) {
          quickSort(arr, index, right);
      }
  }
  return arr;
},

  //},

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  }
};

// инициализация полей

sortTimeLabel.textContent = sortTime;
sortKindLabel.textContent = sortKind;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
sortKind=='bubbleSort' ? (sortKind='quickSort') : (sortKind='bubbleSort') ;
sortKindLabel.textContent = sortKind;
});


sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting ...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
let kindNewFruit=kindInput.value;
let colorNewFruit= colorInput.value;
let weightNewFruit= weightInput.value;
     kindNewFruit&&colorNewFruit&&weightNewFruit ? 
    (fruits.push({kind: kindNewFruit, color: colorNewFruit, weight: weightNewFruit}),
    priorityColor.push(colorNewFruit)) :
    alert('Заполните все поля!');

  display();
});