// Insertion Sort
// Works best with almost sorted arrays
// Best case O(n)

// If data comes continuously then Insertion sort algorithm does well because you don't have to resort data
export function insertionSort(arr: number[]) {
  if (arr.length <= 1) return arr;

  const animationArray: number[][] = [[]];

  for (let i = 1; i < arr.length; i++) {
    let tempVar = arr[i];
    for (var j = i - 1; j >= 0 && arr[j] > tempVar; j--) {
      animationArray.push([j + 1, j]);
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = tempVar;
  }
  return [arr, animationArray];
}
