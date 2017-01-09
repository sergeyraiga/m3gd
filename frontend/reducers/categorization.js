import * as actions from '../actions';

const categorization = [
    { desc: 'Захватываем клетку (желе)', name: 'captureCell', def: 100 },
    { desc: 'Изменение гравитации в клетке', name: 'gravityChange' },
    { desc: 'Уничтожение глазури в клетке',
      vars: [
        { name: 'destroyCellCover', desc: 'Уничтожили совсем', def: 100 },
        { name: 'decreaseCellCover', desc: 'Уменьшили', def: 100 }
      ]
    },
    { desc: 'Нашли спрятанный объект', name: 'findHiddenObject' },
    { desc: 'Подвинули мишку в пузыре', name: 'moveCollectableItem', def: 80 },
    { desc: 'Прогресс по целям',
      vars: [
        { name: 'updateTarget', desc: 'Изменился прогресс цели' },
        { name: 'completeTarget', desc: 'Цель выполнена' }
      ]
    },
    { desc: 'Уничтожение комбинации',
      vars: [
        { name: 'destroyCombox3', desc: 'Из 3 элементов' },
        { name: 'destroyCombox4Line', desc: 'Из 4 в линию', def: 400 },
        { name: 'destroyCombox5Line', desc: 'Из 5 в линию', def: 400 },
        { name: 'destroyCombox4Square', desc: 'Из 4 квадратом, результат рыбка', def: 400 },
        { name: 'destroyCombox5Square', desc: 'Из 5 квадратом, результат рыбка', def: 400 },
        { name: 'destroyCombox6', desc: 'Из 6 элементов', def: 400 },
        { name: 'destroySpecialCombo', desc: 'Со специальным айтемом (бомба + бомба)', def: 400 }
      ]
    },
    { desc: 'Уничтожаем айтемы',
      vars: [
        { name: 'destroySimpleItem', desc: 'Обычный айтем' },
        { name: 'destroyGravityChanger', desc: 'Бутылка', def: 100 },
        { name: 'destroyVerticalBomb', desc: 'Вертикальная бомба', def: 200 },
        { name: 'destroyHorizonalBomb', desc: 'Горизонтальная бомба', def: 200 },
        { name: 'destroyBomb9', desc: 'Бомба-9ка', def: 200 },
        { name: 'destroyHomingBomb', desc: 'Рыбка', def: 200 },
        { name: 'destroyColorPickerBomb', desc: 'Цветная бомба', def: 200 },
        { name: 'destroyMulticoloringBomb', desc: 'Красящая бомба', def: 200 },
        { name: 'destroyCollectableItem', desc: 'Медведь в пузыре', def: 100 },
        { name: 'destroyLockerItem', desc: 'Лакрица' }
      ]
    },
    { desc: 'Уничтожаем блокеры',
      vars: [
        { name: 'destroySimpleBlocker', desc: 'Пироженка', def: 80 },
        { name: 'destroyIceBlocker', desc: 'Лед', def: 80 },
        { name: 'destroyLockBlocker', desc: 'Замок', def: 80 },
        { name: 'destroySimpleViralBlocker', desc: 'Шоколад темный', def: 100 },
        { name: 'destroyDoubleSimpleViralBlocker', desc: 'Шоколад белый', def: 100 },
        { name: 'destroySpecialLockBlocker', desc: 'Мед', def: 80 },
        { name: 'destroySpecialViralBlocker', desc: 'Жвачка', def: 100 }
      ]
    },
    { desc: 'Спауним специальные айтемы',
      vars: [
        { name: 'spawnVerticalBomb', desc: 'Вертикальная бомба' },
        { name: 'spawnHorizonalBomb', desc: 'Горизонтальная бомба' },
        { name: 'spawnHomingBomb', desc: 'Вертикальная бомба' },
        { name: 'spawnBomb9', desc: 'Девятка' },
        { name: 'spawnColorPickerBomb', desc: 'Цветная' },
        { name: 'spawnMultiColoringBomb', desc: 'Красящая' }
      ]
    },
    { desc: 'Уничтожить блокер на бутылке',
      name: 'destroyBlockerOnGravityChanger', def: 100
    },
    { desc: 'Уничтожить блокер на глазури с медведем',
      name: 'destroyHiddenObjectBlocker', def: 90
    },
    { desc: 'Уничтожить блокер над медведем с пузырем',
      name: 'destroyBlockerOnCollectedItemWay', def: 90
    },
    { desc: 'Уничтожить айтем над медведем с пузырем',
      name: 'destroyItemOnCollectedItemWay', def: 70
    },
];

const defaultRangeParams = {
  'captureCell': 100,
  'destroyCellCover': 100,
  'decreaseCellCover': 100,
  'moveCollectableItem': 80,
  'destroyCombox4Line': 400,
  'destroyCombox5Line': 400,
  'destroyCombox4Square': 400,
  'destroyCombox5Square': 400,
  'destroyCombox6': 400,
  'destroySpecialCombo': 400,
  'destroyGravityChanger': 100,
  'destroyVerticalBomb': 200,
  'destroyHorizonalBomb': 200,
  'destroyBomb9': 200,
  'destroyHomingBomb': 200,
  'destroyColorPickerBomb': 200,
  'destroyMulticoloringBomb': 200,
  'destroyCollectableItem': 100,
  'destroySimpleBlocker': 80,
  'destroyIceBlocker': 80,
  'destroyLockBlocker': 80,
  'destroySimpleViralBlocker': 100,
  'destroyDoubleSimpleViralBlocker': 100,
  'destroySpecialLockBlocker': 80,
  'destroySpecialViralBlocker': 100,
  'destroyBlockerOnGravityChanger': 90,
  'destroyHiddenObjectBlocker': 90,
  'destroyBlockerOnCollectedItemWay': 70,
  'destroyItemOnCollectedItemWay': 100
};

export const currentRangeParams = (state = defaultRangeParams, action) => {
  switch (action.type) {
  case actions.CHANGE_RANGE_PARAMS:
    if (action.value !== '') {
      return { ...state, [action.name]: parseInt(action.value, 10) };
    }
    else {
      let copy = Object.assign({}, state);
      delete copy[action.name];
      return copy;
    }
  default:
    return state;
  }
}

export const rangeParams = (state = categorization) => state;
