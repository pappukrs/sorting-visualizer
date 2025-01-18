// Bubble Sort
export function bubbleSort(array) {
    const animations = [];
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        animations.push([j, j + 1, false]); // Compare
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          animations.push([j, j + 1, true]); // Swap
        }
      }
    }
    return animations;
  }
  
  // Selection Sort
  export function selectionSort(array) {
    const animations = [];
    const n = array.length;
    for (let i = 0; i < n; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        animations.push([minIdx, j, false]); // Compare
        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        animations.push([i, minIdx, true]); // Swap
      }
    }
    return animations;
  }
  
  // Quick Sort
  export function quickSort(array) {
    const animations = [];
    const quickSortHelper = (arr, start, end) => {
      if (start >= end) return;
      let pivot = arr[end];
      let i = start;
      for (let j = start; j < end; j++) {
        animations.push([j, end, false]); // Compare
        if (arr[j] < pivot) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          animations.push([i, j, true]); // Swap
          i++;
        }
      }
      [arr[i], arr[end]] = [arr[end], arr[i]];
      animations.push([i, end, true]); // Swap
      quickSortHelper(arr, start, i - 1);
      quickSortHelper(arr, i + 1, end);
    };
  
    quickSortHelper(array, 0, array.length - 1);
    return animations;
  }
  
  // Insertion Sort
  export function insertionSort(array) {
    const animations = [];
    const n = array.length;
    for (let i = 1; i < n; i++) {
      let key = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > key) {
        animations.push([j, j + 1, false]); // Compare
        array[j + 1] = array[j];
        animations.push([j, j + 1, true]); // Swap
        j--;
      }
      array[j + 1] = key;
    }
    return animations;
  }
  
  // Merge Sort
  export function mergeSort(array) {
    const animations = [];
    const mergeSortHelper = (arr, tempArray, left, right) => {
      if (left >= right) return;
      const mid = Math.floor((left + right) / 2);
      mergeSortHelper(tempArray, arr, left, mid);
      mergeSortHelper(tempArray, arr, mid + 1, right);
      merge(arr, tempArray, left, mid, right);
    };
  
    const merge = (arr, tempArray, left, mid, right) => {
      let i = left,
        j = mid + 1,
        k = left;
  
      while (i <= mid && j <= right) {
        animations.push([i, j, false]); // Compare
        if (tempArray[i] <= tempArray[j]) {
          arr[k++] = tempArray[i++];
        } else {
          arr[k++] = tempArray[j++];
        }
      }
      while (i <= mid) {
        arr[k++] = tempArray[i++];
      }
      while (j <= right) {
        arr[k++] = tempArray[j++];
      }
    };
  
    mergeSortHelper(array.slice(), array, 0, array.length - 1);
    return animations;
  }
  
  // Heap Sort
  export function heapSort(array) {
    const animations = [];
    const heapify = (arr, n, i) => {
      let largest = i;
      let left = 2 * i + 1;
      let right = 2 * i + 2;
  
      if (left < n && arr[left] > arr[largest]) {
        largest = left;
      }
      if (right < n && arr[right] > arr[largest]) {
        largest = right;
      }
      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        animations.push([i, largest, true]); // Swap
        heapify(arr, n, largest);
      }
    };
  
    const n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(array, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
      [array[0], array[i]] = [array[i], array[0]];
      animations.push([0, i, true]); // Swap
      heapify(array, i, 0);
    }
    return animations;
  }
  