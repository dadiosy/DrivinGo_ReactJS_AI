const handSignNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'x', 'y'];
const speechData = {
  en: {
    "confirm": ["yes", "confirm", "ok", "okay"],
    "cancel": ["no", "cancel", "stop"],
    "finish": ["finish", "finish order"],
    "back": ["back", "go back", "undo"],
    "small": ["small"],
    "medium": ["medium"],
    "large": ["large"],
    "1": ["1", "one"],
    "2": ["2", "two"],
    "3": ["3", "three"],
    "4": ["4", "four"],
    "5": ["5", "five"],
    "6": ["6", "six"],
    "7": ["7", "seven"],
    "8": ["8", "eight"],
    "9": ["9", "nine"],
  },
  es: {
    "1": ["1", "Uno"],
    "2": ["2", "Dos"],
    "3": ["3", "Tres"],
    "4": ["4", "Cuatro"],
    "5": ["5", "Cinco"],
    "6": ["6", "Seis"],
    "7": ["7", "Siete"],
    "8": ["8", "Ocho"],
    "9": ["9", "Nueve"],
    "back": ["volver", "deshacer"],
    "confirm": ["Sí", "confirmar", "De acuerdo", "Bien"],
    "cancel": ["No", "Cancelar", "parar"],
    "finish": ["terminar", "Finalizar orden"],
    "small": ["pequeño"],
    "medium": ["Medio"],
    "large": ["grande"]
  },
  de: {
    "1": ["1", "Eins"],
    "2": ["2", "Zwei"],
    "3": ["3", "Drei"],
    "4": ["4", "Vier"],
    "5": ["5", "Fünf"],
    "6": ["6", "Sechs"],
    "7": ["7", "Sieben"],
    "8": ["8", "Acht"],
    "9": ["9", "Neun"],
    "back": ["zurück", "rückgängig machen"],
    "confirm": ["ja", "bestätigen", "ok", "okay"],
    "cancel": ["Nein", "Abbrechen", "aufhören"],
    "finish": ["beenden", "Bestellung beenden"],
    "small": ["klein"],
    "medium": ["Mittel"],
    "large": ["groß"]
  },
  cn: {
    "1": ["1", "一"],
    "2": ["2", "二"],
    "3": ["3", "三"],
    "4": ["4", "四"],
    "5": ["5", "五"],
    "6": ["6", "六"],
    "7": ["7", "七"],
    "8": ["8", "八"],
    "9": ["9", "九"],
    "back": ["返回", "撤消"],
    "confirm": ["是的", "确认", "还行", "好"],
    "cancel": ["不", "取消", "停"],
    "finish": ["完成", "完成顺序"],
    "small": ["小"],
    "medium": ["中等"],
    "large": ["大"]
  }
}

export function captalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generateHandGestures(length) {
  let result = [];

  for (let i = 0; i < length; i++) {
    result.push(handSignNames[i]);
  }

  return result;
}

export function assignHandGestures(itemList) {
  let data = itemList;
  let handData = generateHandGestures(data.length);

  for (let i = 0; i < data.length; i++) {
    data[i].hand = handData[i];
  }

  return data;
}

export function recognizerSelectSpeech(language, transcript) {
  let script = '';
  if(language === 'cn') {
    script = transcript;
  } else {
    script = transcript.toLowerCase();
  }
  let catchedData = '';

  Object.keys(speechData[language]).map(key => {
    if (speechData[language][key].includes(script)) {
      catchedData = key;
    }
  });

  return catchedData;
}

export function recognizeSelectionType(language, transcript) {
  const sizeType = ["small", "medium", "large"]
  const countType = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  if (sizeType.includes(recognizerSelectSpeech(language, transcript))) {
    return 'size';
  } else if (countType.includes(recognizerSelectSpeech(language, transcript))) {
    return 'count';
  } else {
    return 'other';
  }
}

export function recognizeGestureType(gesture) {
  const sizeType = ["s", "n", "l"];
  const countType = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  if (sizeType.includes(gesture)) {
    return 'size';
  } else if (countType.includes(gesture)) {
    return 'count';
  } else {
    return 'other';
  }
}