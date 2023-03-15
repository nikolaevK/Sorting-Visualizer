// O(n log n)
// Uses more space than quickSort

export function mergeSort(
  arr: number[],
  animArr: number[][],
  startIndex: number = 0
) {
  // check length to stop recursion and to return sorted array
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
    startIndex + splitIndex
  );

  return merge(
    leftSide,
    rightSide,
    animArr,
    startIndex + 0,
    startIndex + splitIndex
  );
}

function merge(
  leftSide: number[],
  rightSide: number[],
  animArr: number[][],
  leftStartIndex: number,
  rightStartIndex: number
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
      merged.push(leftValue);
      animArr.push([leftValue, j + leftStartIndex]);
      j++;
    } else if (j >= leftSide.length) {
      merged.push(rightValue);
      animArr.push([rightValue, i + rightStartIndex]);
      i++;
    } else if (rightValue < leftValue) {
      merged.push(rightValue);
      animArr.push([rightValue, i + rightStartIndex]);
      i++;
    } else {
      merged.push(leftValue);
      animArr.push([leftValue, j + leftStartIndex]);
      j++;
    }
  }

  return merged;
}
