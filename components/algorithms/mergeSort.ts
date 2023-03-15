// O(n log n)
// Uses more space than quickSort

export function mergeSort(
  arr: number[],
  animArr: number[][],
  startIndex: number = 0 // needed to keep track of values and their indexes
) {
  // checks length to stop recursion and to return sorted array
  if (arr.length <= 1) {
    return arr;
  }

  const splitIndex = Math.floor(arr.length / 2);

  // .slice does not include the splitIndex / (end value)
  const leftSide: number[] = mergeSort(
    arr.slice(0, splitIndex),
    animArr,
    startIndex + 0
  );
  // .slice includes the splitIndex / (start value)
  const rightSide: number[] = mergeSort(
    arr.slice(splitIndex),
    animArr,
    // further right into array more we have to add
    // to keep track of indexes of right values in the array
    startIndex + splitIndex
  );

  return merge(leftSide, rightSide, animArr, startIndex);
}

function merge(
  leftSide: number[],
  rightSide: number[],
  animArr: number[][], // needed for animation, swapped values at their original indexes are pushed as [value, index]
  startIndex: number // needed for animation
): number[] {
  const merged = [];
  let i = 0;
  let j = 0;

  while (i < rightSide.length || j < leftSide.length) {
    const rightValue = rightSide[i];
    const leftValue = leftSide[j];

    // >= would mean that array is empty or iterated through
    // all left to do is to push all the values from the other array
    if (i >= rightSide.length) {
      animArr.push([leftValue, merged.length + startIndex]);
      merged.push(leftValue);
      j++;
    } else if (j >= leftSide.length) {
      animArr.push([rightValue, merged.length + startIndex]);
      merged.push(rightValue);
      i++;
    } else if (rightValue < leftValue) {
      // pushing a value with its original startIndex
      // here the right value is smaller that left one
      // We push right value with the index of left value to indicate a swap for animation
      // And on the second iteration we assign left value to rightValue's index + merged which will be 1
      animArr.push([rightValue, merged.length + startIndex]);
      merged.push(rightValue);
      i++;
    } else {
      // here the left value is larger than the right value
      // we push the value with its original startIndex to indicate of no change
      // increase the index by adding the length of the merged array, if there are values
      // during the first iteration merged's length is 0, assign smallest value to startIndex
      animArr.push([leftValue, merged.length + startIndex]);
      merged.push(leftValue);
      j++;
    }
  }

  return merged;
}
