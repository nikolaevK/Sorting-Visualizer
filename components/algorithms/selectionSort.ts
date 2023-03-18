// Similar to bubble sort but instead of pushing max values to the end of the array
// This algorithm tracks min value and swaps it with beginning value in the array
// Per one iteration single min value is found and moved to the beginning of the array
// Best case O(n^2)
// Better than bubble sort only when need to minimize memory usage by decreasing amounts of swaps
export function selectionSort(selectionArr: number[]) {
  const animationSelectionArray: number[][] = [];

  if (selectionArr.length <= 1)
    return { selectionArr, animationSelectionArray };

  for (let i = 0; i < selectionArr.length; i++) {
    let min = i;
    // O(n^2) because it keeps looking for min value
    for (let j = i; j < selectionArr.length; j++) {
      if (selectionArr[min] > selectionArr[j]) {
        min = j;
      }
    }
    // swap only if i and index of min value are different to avoid extra steps
    if (i !== min) {
      animationSelectionArray.push([min, i]);
      let temp = min;
      selectionArr[min] = selectionArr[i];
      selectionArr[i] = temp;
    }
  }

  return { selectionArr, animationSelectionArray };
}
