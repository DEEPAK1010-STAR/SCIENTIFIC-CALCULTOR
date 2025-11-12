document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.calc-btn');

    function factorial(n) {
        if (n < 0 || n % 1 !== 0) return NaN; 
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;

            if (value === 'C') {
                display.value = '';
            } else if (value === 'DEL') {
                display.value = display.value.slice(0, -1);
            } else if (value === '=') {
                if (display.value) {
                    try {
                        const result = calculate(display.value);
                        display.value = result;
                    } catch (error) {
                        display.value = 'Error';
                    }
                }
            } else {
                display.value += value;
            }
        });
    });

    function calculate(expression) {
        let processed = expression.replace(/π/g, 'Math.PI');
        processed = processed.replace(/\^/g, '**');
        processed = processed.replace(/sqrt\(/g, 'Math.sqrt(');
        processed = processed.replace(/log\(/g, 'Math.log10(');
        processed = processed.replace(/ln\(/g, 'Math.log(');
        processed = processed.replace(/sin\(/g, 'Math.sin(Math.PI/180*');
        processed = processed.replace(/cos\(/g, 'Math.cos(Math.PI/180*');
        processed = processed.replace(/tan\(/g, 'Math.tan(Math.PI/180*');
        processed = processed.replace(/%/g, '/100');

        processed = processed.replace(/(\d+\.?\d*)!/g, (match, num) => {
            return factorial(parseFloat(num));
        });

        const result = new Function('return ' + processed)();

        if (isNaN(result) || !isFinite(result)) {
            return 'Error';
        }

        return result;
    }
});
