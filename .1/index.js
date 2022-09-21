
const fruitsList = document.querySelector('.fruits__list');
const shuffleButton = document.querySelector('.shuffle__btn');
const filterButton = document.querySelector('.filter__btn');
const sortKindLabel = document.querySelector('.sort__kind');
const sortTimeLabel = document.querySelector('.sort__time');
const sortChangeButton = document.querySelector('.sort__change__btn');
const sortActionButton = document.querySelector('.sort__action__btn');
const kindInput = document.querySelector('.kind__input');
const colorInput = document.querySelector('.color__input');
const weightInput = document.querySelector('.weight__input');
const addActionButton = document.querySelector('.add__action__btn');
let temp;
const minWeight = document.querySelector('.minweight__input');
const maxWeight = document.querySelector('.maxweight__input');

let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
   ]`;

let fruits = JSON.parse(fruitsJSON);

const display = () => {
  fruitsList.innerHTML='';
   
  for (let i = 0; i <fruits.length; i++) {
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
display();


const getRandomInt = (max) => {
  return Math.floor(Math.random() * max) ;
};

const shuffleFruits = () => {
  let result = [];
  let r=0;
  while (fruits.length > 0) {
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

let sortKind = 'bubbleSort';
let sortTime = '-'; 
let priorityColor = ['желтый', 'зеленый', 'розово-красный', 'светло-коричневый', 'фиолетовый'];

const comparationColor = (color1, color2) => {
    const priority1 = priorityColor.indexOf(color1.color);
    const priority2 = priorityColor.indexOf(color2.color);
    return priority1 > priority2;
};

const sortAPI = {

  bubbleSort(arr, comparationColor) {
       const n = arr.length;
       for (let i = 0; i < n-1; i++) { 
           for (let j = 0; j < n-1-i; j++) { 
               if (comparationColor(arr[j], arr[j+1])) { 
                   let temp = arr[j+1]; 
                   arr[j+1] = arr[j]; 
                   arr[j] = temp; 
               }
           }
       }                    
  },


swap(arr, firstIndex, secondIndex){
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
},

partition(arr, left, right) {
  var pivot = arr[Math.floor((right + left) / 2)],
      i = left,
      j = right;
  while (i <= j) {
      while (comparationColor(arr[i],pivot)) {
          i++;
      }
      while (comparationColor(pivot,arr[j])) {
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

  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  }
};

sortTimeLabel.textContent = sortTime;
sortKindLabel.textContent = sortKind;

sortChangeButton.addEventListener('click', () => {
sortKind=='bubbleSort' ? (sortKind='quickSort') : (sortKind='bubbleSort') ;
sortKindLabel.textContent = sortKind;
});


sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'sorting ...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
let kindNewFruit=kindInput.value;
let colorNewFruit= colorInput.value;
let weightNewFruit= weightInput.value;
     kindNewFruit&&colorNewFruit&&weightNewFruit ? 
    (fruits.push({kind: kindNewFruit, color: colorNewFruit, weight: weightNewFruit}),
    priorityColor.push(colorNewFruit)) :
    alert('Заполните все поля!');

  display();
});