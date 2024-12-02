let caculatorFibonacci = async (req, res) => {
  const functionFibonacci = `
    function fibonacci(n) {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
  `;

  return res.status(200).json({
    success: true,
    data: functionFibonacci,
    name: "Fibonacci",
    message: "Nhận thành công hàm tính Fibonacci từ server!",
  });
};

let caculatorFactorial = async (req, res) => {
  const factorial = `
  function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
  }
  `;

  return res.status(200).json({
    success: true,
    data: factorial,
    name: "Factorial",
    message: "Nhận thành công hàm tính Factorial từ server!",
  });
};

let caculatorPrimeNumbers = async (req, res) => {
  const primeNumbers = `
    function getPrimeNumbers(n) {
      if (n < 2) return [];
      
      const primes = [];
      for (let i = 2; i <= n; i++) {
        let isPrime = true;
        for (let j = 2; j * j <= i; j++) {
          if (i % j === 0) {
            isPrime = false;
            break;
          }
        }
        if (isPrime) primes.push(i);
      }
      return primes;
    }
  `;

  return res.status(200).json({
    success: true,
    data: primeNumbers,
    name: "PrimeNumbers",
    message: "Nhận thành công hàm kiểm tra và tìm số nguyên tố từ server!",
  });
};

export default {
  caculatorFibonacci,
  caculatorFactorial,
  caculatorPrimeNumbers
};
