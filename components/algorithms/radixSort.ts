// Radix Sort
// Works on lists of numbers
// doesn't do comparisons
// O(nk)

export function radixSort(radixSortArray: number[]) {
  const animationRadixArray: number[][] = [];

  if (radixSortArray.length <= 0)
    return { radixSortArray, animationRadixArray };

  let n = mostDigits(radixSortArray); // most digits in individual number

  for (let i = 0; i < n; i++) {
    let buckets: number[][] = Array.from({ length: 10 }, () => []); // only works with base 10 numbers in this case

    for (let j = 0; j < radixSortArray.length; j++) {
      // returns the order of digit in a particular number depending on Nth time
      // Ex. 12456 => 6 is at i = 0; 2 is at i = 3
      let digit = getDigit(radixSortArray[j], i);
      if (typeof digit === "number") {
        buckets[digit].push(radixSortArray[j]); // pushes the whole number to the bucket with same digit
      }
    }
    radixSortArray = ([] as number[]).concat(...buckets); // reassigning the array with new indexes

    // Animation Array which takes value and a new index of the value
    radixSortArray.forEach((element, index) =>
      animationRadixArray.push([element, index])
    );
  }
  return { radixSortArray, animationRadixArray };
}

// Helper functions
function getDigit(number: number, position: number) {
  if (typeof number === "string" || isNaN(number)) return;
  // Based ten numbers
  // absolute for negative numbers
  // floor for getting a remainder
  return Math.floor(Math.abs(number) / Math.pow(10, position)) % 10;
}

function getDigitCount(num: number) {
  return num.toString().length;
}

function mostDigits(array: number[]) {
  let max = 0;

  for (let num of array) {
    max = Math.max(max, getDigitCount(num));
  }
  return max;
}
