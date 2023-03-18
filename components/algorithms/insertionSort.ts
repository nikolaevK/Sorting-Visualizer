// Insertion Sort
// Works best with almost sorted arrays
// Best case O(n)

// If data comes continuously then Insertion sort algorithm does well because you don't have to resort data
export function insertionSort(insertionArr: number[]) {
  const animationInsertionArray: number[][] = [];

  for (let i = 1; i < insertionArr.length; i++) {
    let tempVar = insertionArr[i];
    for (var j = i - 1; j >= 0 && insertionArr[j] > tempVar; j--) {
      // pushing indexes of swapped numbers
      animationInsertionArray.push([j + 1, j]);
      insertionArr[j + 1] = insertionArr[j];
    }
    insertionArr[j + 1] = tempVar;
  }
  return { insertionArr, animationInsertionArray };
}
