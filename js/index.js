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
const minWeightInputField = document.querySelector('.minweight__input');  // input field with minimum weight to filter
const maxWeightInputField = document.querySelector('.maxweight__input'); 

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
  
  // function removeChildren (parent) {
  //   while (parent.firstChild) {
  //     parent.removeChild(parent.firstChild);
  //   };
  // };
  fruitsList.innerText = ''; 

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    const {kind = '', color = '', weight = ''} = fruits[i];

    const fruitItems = document.createElement('li');
    fruitItems.classList.add('fruit__item');
    fruitsList.appendChild(fruitItems);
    fruitItems.classList.add(getColorClass(color));

    const fruitInfo = document.createElement('div');
    fruitInfo.classList.add('fruit__info');

    const fruitIndex = document.createElement('div');
    fruitIndex.appendChild(document.createTextNode(`index: ${i}`));
    fruitInfo.appendChild(fruitIndex);

    const fruitKind = document.createElement('div');
    fruitKind.appendChild(document.createTextNode(`kind: ${kind}`));
    fruitInfo.appendChild(fruitKind);

    const fruitColor = document.createElement('div');
    fruitColor.appendChild(document.createTextNode(`color: ${color}`));
    fruitInfo.appendChild(fruitColor);

    const fruitWeight = document.createElement('div');
    fruitWeight.appendChild(document.createTextNode(`weight(кг): ${weight}`));
    fruitInfo.appendChild(fruitWeight);

    fruitItems.appendChild(fruitInfo);
    fruitsList.appendChild(fruitItems);


   
    // fruitLiItem.classList.add(getColorClass(color));
  }
};
const getColorClass = (color) => {
  switch (color) {
    case 'фиолетовый':
      result = 'fruit_violet';
      break;
    case 'зелёный':
      result = 'fruit_green';
      break;
    case 'розово-красный':
      result = 'fruit_carmazin';
      break;
    case 'желтый':
      result = 'fruit_yellow';
      break;
    case 'светло-коричневый':
      result = 'fruit_lightbrown';
      break;
    default:
      result = 'fruit_green';
      break;
  }
  return result;
}
// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleFruits = () => {
  let result = [];
  const anew = fruits;

  while (fruits.length > 0) {
    // Получаем рандомный фрукт.
    const fruit = fruits[getRandomInt(0, fruits.length - 1)];
    result.push(fruit);
    fruits = fruits.filter(item => item['kind'] !== fruit['kind']);
  }

  // Переменная - флаг, позволяющая отследить изменен ли массив за последнюю итерацию перемешивания
  let isArrayNotChange = true;

  for (let i = 0; i < anew.length; i++) {
    if (isArrayNotChange && anew[i].kind !== result[i].kind) isArrayNotChange = false;
    if (!isArrayNotChange) break;
  }
    // Если после проверки флаг еще поднят, то выдаем сообщение пользователю в виде alert сообщения.
    if (isArrayNotChange) {
      alert('При выполнении перемешивания возникла ошибка, попробуйте нажать кнопку еще раз');
    }
  
    // Записываем результат в массив fruits
    fruits = result;
  };
  
  shuffleButton.addEventListener('click', () => {
    shuffleFruits();
    display();
  });
/*** ФИЛЬТРАЦИЯ ***/

const filterFruits = () => {
  let filtered = fruits.filter(function(fruit) {
    return fruit.weight <= maxWeightInputField.value && fruit.weight >= minWeightInputField.value;
  });
  fruits = filtered;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});


/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (fruit1, fruit2) => {
  const priorityColor = ['желтый','светло-коричневый','розово-красный','фиолетовый','зеленый'];
  const priority1 = priorityColor.indexOf(fruit1.color);
  const priority2 = priorityColor.indexOf(fruit2.color);
  return priority1 > priority2;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    const lengthSort = arr.length;
    for (let i = 0; i < lengthSort-1; i++) { 
      // внутренняя итерация для перестановки элемента в конец массива
      for (let j = 0; j < lengthSort-1-i; j++) { 
          // сравниваем элементы
          if (comparation(arr[j], arr[j+1])) { 
              // делаем обмен элементов
              let temp = arr[j+1]; 
              arr[j+1] = arr[j]; 
              arr[j] = temp; 
            }
            // Если текущий элемент не больше следующего, то пропускаем ход.
          }
        }
      }, 
    

  quickSort(arr, comparation) {
    function swap(items, firstIndex, secondIndex) {
      const tmp = items[firstIndex];
      items[firstIndex] = items[secondIndex];
      items[secondIndex] = tmp;
    }
    function partition(items, left, right) {
      let pivot = items[Math.floor((right + left) / 2)],
          i = left,
          j = right;
      while (i <= j) {
          while (comparationColor(pivot,items[i])) {
              i++;
          }
          while (comparationColor(items[j],pivot)) {
              j--;
          }
          if (i <= j) {
              swap(items, i, j);
              i++;
              j--;
          }
      }
      return i;
   }
   function qS (items, left, right) {
    let index;
    if (items.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;
        index = partition(items, left, right);

        if (left < index - 1) {
            qS(items, left, index - 1);
        }
        if (index < right) {
          qS(items, index, right);
        }
      }
    }

     qS(arr);
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  sortKind = sortKind === 'bubbleSort' ? 'quickSort' : 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'sorting...';

  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  
  const kind = kindInput.value;
  const color = colorInput.value;
  const weight = weightInput.value;
  if (!kind || !color || !weight) {
    alert('Неоходимо заполнить все поля!');
  } else {
   
    fruits.push({
      "kind": kind,
      "color": color,
      "weight":weight
    });

    display();
  }
});
