const colorThemes = document.querySelectorAll('[name="theme-select"]');

let currentInput = '';
let previousInput = '';
let operation = '';

const valuesStack = [];


const buttons = document.querySelectorAll('.number, .operation');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('number')) {
      // If a number button is clicked, add it to the values stack
      valuesStack.push(value);

      // Append the number to the current input
      currentInput += value;

      // Format the current input with commas
      currentInput = formatNumberWithCommas(currentInput);
    } else if (button.classList.contains('operation')) {
      if (value === '=') {
        // If the equal button is clicked, perform the calculation
        calculate();
      } else if (value === 'Reset') {
        // If the reset button is clicked, clear the inputs and operation
        clear();
      } else if (value === 'DEL') {
        // If the delete button is clicked, remove the last value from the values stack
        if (valuesStack.length > 0) {
          valuesStack.pop();
        }

        // Update the current input with the values from the stack
        currentInput = valuesStack.join('');

        // Format the current input with commas
        currentInput = formatNumberWithCommas(currentInput);
      } else {
        // If an operation button is clicked, store the operation and current input
        if (currentInput !== '') {
          previousInput = currentInput;
          operation = value;
          currentInput = '';
        }
      }
    }

    // Update the display with the current input
    document.getElementById('screen').value = currentInput;
  });
});
function formatNumberWithCommas(number) {
  // Remove existing commas before formatting
  number = number.replace(/,/g, '');

  return parseFloat(number).toLocaleString();
}

function calculate() {
  if (previousInput !== '' && currentInput !== '' && operation !== '') {
    const num1 = parseFloat(previousInput.replace(/,/g, ''));
    const num2 = parseFloat(currentInput.replace(/,/g, ''));
    switch (operation) {
      case '+':
        currentInput = (num1 + num2).toLocaleString();
        break;
      case '-':
        currentInput = (num1 - num2).toLocaleString();
        break;
      case 'x':
        currentInput = (num1 * num2).toLocaleString();
        break;
      case '/':
        currentInput = (num1 / num2).toLocaleString();
        break;
    }
    previousInput = '';
    operation = '';
  }
}

function clear() {
  currentInput = 0;
  previousInput = 0;
  operation = '';
  document.getElementById('screen').value = '0';
}


const storeTheme = function (theme) {
  localStorage.setItem("theme-select", theme);
};

// set theme when visitor returns
const setTheme = function () {
  const activeTheme = localStorage.getItem("theme-select");
  colorThemes.forEach((themeOption) => {
    if (themeOption.id === activeTheme) {
      themeOption.checked = true;
    }
  });
  // fallback for no :has() support
  document.documentElement.className = activeTheme;
};

colorThemes.forEach((themeOption) => {
  themeOption.addEventListener("click", () => {
    storeTheme(themeOption.id);
    // fallback for no :has() support
    document.documentElement.className = themeOption.id;
  });
});

document.onload = setTheme();
