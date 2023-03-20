export function quickSort(
  quickSortArray: number[],
  quickSortAnimationArr: number[][],
  left = 0,
  right = quickSortArray.length
) {
  if (left < right) {
    let index = pivot2(quickSortArray, quickSortAnimationArr, left, right);
    // leftSide
    quickSort(quickSortArray, quickSortAnimationArr, left, index - 1);
    // rightSide
    quickSort(quickSortArray, quickSortAnimationArr, index + 1, right);
  }

  return quickSortArray;
}

function pivot2(
  quickSortArray: number[],
  quickSortAnimationArr: number[][],
  start = 0,
  end = quickSortArray.length
) {
  const swap = (quickSortArray: number[], i: number, j: number) => {
    let temp = quickSortArray[i];
    quickSortArray[i] = quickSortArray[j];
    quickSortArray[j] = temp;
  };

  const pivot = quickSortArray[start];
  let counter = start;

  // on the fist iteration, array[end] doesn't exist
  // but it does on the next recursion
  for (let i = start + 1; i <= end; i++) {
    if (pivot > quickSortArray[i]) {
      counter += 1;
      if (counter !== i) {
        quickSortAnimationArr.push([i, counter]);

        swap(quickSortArray, i, counter);
      }
    }
  }
  quickSortAnimationArr.push([start, counter]);

  swap(quickSortArray, start, counter);

  // index of the pivot element
  return counter;
}
