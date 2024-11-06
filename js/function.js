// Функция для проверки длины строки.
const checkLenght = (string = '', maxLenght = 0) => string.length <= maxLenght;

// Строка короче 20 символов
checkLenght('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkLenght('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkLenght('проверяемая строка', 10); // false

// Функция для проверки, является ли строка палиндромом.
const checkPalindrome = (string = '') => {
  const normalizedString = string.replaceAll(' ', '').toUpperCase(); // «Нормализовать» полученную строку
  let reverse = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reverse += normalizedString[i];
  }
  return normalizedString === reverse;
};

// Строка является палиндромом
checkPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
checkPalindrome('ДовОд'); // true
// Это не палиндром
checkPalindrome('Кекс'); // false
// Это палиндром
checkPalindrome('Лёша на полке клопа нашёл '); // true

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
function getNumber (string) {
  string = string.toString();
  let result = '';
  let negative = false;
  if (string[0] === '-') {
    negative = true;
    string = string.substring(1);
  }
  for (let i = 0; i < string.length; i++) {
    const parseLetter = parseInt(string[i], 10);
    const isNumber = !Number.isNaN(parseLetter);
    if (isNumber) {
      result += parseLetter;
    }
  }
  const num = parseInt(result, 10);
  return negative ? -num : num;
}

getNumber('2023 год'); // 2023
getNumber('ECMAScript 2022'); // 2022
getNumber('1 кефир, 0.5 батона'); // 105
getNumber('агент 007'); // 7
getNumber('а я томат'); // NaN
getNumber(2023); // 2023
getNumber(1.5); // 15
getNumber(-1); // 1
