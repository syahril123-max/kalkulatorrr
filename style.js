const display = document.getElementById('display');

// Menambahkan event listener untuk input keyboard
display.addEventListener('keypress', function(e) {
  // Mengizinkan tombol angka (0-9)
  if ((e.key >= '0' && e.key <= '9') || 
      // Mengizinkan operator
      e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || 
      // Mengizinkan titik desimal
      e.key === '.' || 
      // Mengizinkan tanda kurung
      e.key === '(' || e.key === ')' ||
      // Mengizinkan persen
      e.key === '%') {
    return true;
  } else {
    e.preventDefault();
  }
});

// Menambahkan event listener untuk tombol khusus
display.addEventListener('keydown', function(e) {
  // Mengizinkan tombol Enter untuk kalkulasi
  if (e.key === 'Enter') {
    e.preventDefault();
    calculate();
  }
  // Mengizinkan tombol Backspace untuk menghapus
  else if (e.key === 'Backspace') {
    return true;
  }
  // Mengizinkan tombol Escape untuk clear
  else if (e.key === 'Escape') {
    e.preventDefault();
    clearDisplay();
  }
});

function append(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  try {
    let expression = display.value;
    
    // Menangani operasi persen
    if (expression.includes('%')) {
      expression = expression.replace(/(\d+)%/g, function(match, number) {
        return number / 100;
      });
    }
    
    display.value = eval(expression);
  } catch (e) {
    display.value = 'Error';
  }
}

function applyTrig(func) {
  try {
    let angle = parseFloat(display.value);
    let rad = angle * Math.PI / 180; // konversi ke radian
    let result = 0;
    if (func === 'sin') result = Math.sin(rad);
    else if (func === 'cos') result = Math.cos(rad);
    else if (func === 'tan') result = Math.tan(rad);
    // Menggunakan parseFloat untuk menghapus angka 0 yang tidak perlu di belakang
    display.value = parseFloat(result.toFixed(3));
  } catch {
    display.value = 'Error';
  }
}

function toRadians() {
  try {
    let deg = parseFloat(display.value);
    display.value = (deg * Math.PI / 180).toFixed(6);
  } catch {
    display.value = 'Error';
  }
}