// Best case O(n)
// When data is nearly sorted then Bubble and Insertion algorithms perform quicker than the others

export function bubbleSort(bubbleArr: number[]) {
  const animationBubbleArray: number[][] = [];

  for (let i = 0; i < bubbleArr.length - 1; i++) {
    // swap allows for optimization in case array is almost sorted
    // if there was no swap, it would break out of the loop and return sorted array
    let swap = true;

    for (let j = 0; j < bubbleArr.length - i - 1; j++) {
      if (bubbleArr[j] > bubbleArr[j + 1]) {
        animationBubbleArray.push([j, j + 1]);

        let temp = bubbleArr[j];
        bubbleArr[j] = bubbleArr[j + 1];
        bubbleArr[j + 1] = temp;

        swap = false;
      }
    }
    if (swap) break;
  }
  return { bubbleArr, animationBubbleArray };
}
