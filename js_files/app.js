"use strict";

const algorithmInfo = {
  1: {
    name: "Bubble Sort",
    description:
      "Bubble Sort is an iterative sorting algorithm that imitates the movement of bubbles in sparkling water. The bubbles represents the elements of the data structure. The bigger bubbles reach the top faster than smaller bubbles, and this algorithm works in the same way. It iterates through the data structure and for each cycle compares the current element with the next one, swapping them if they are in the wrong order. It's a simple algorithm to implement, but not much efficient: on average, quadratic sorting algorithms with the same time complexity such as Selection Sort or Insertion Sort perform better.",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
  },
  2: {
    name: "Selection Sort",
    description:
      "Selection Sort is an iterative and in-place sorting algorithm that divides the data structure in two sublists: the ordered one, and the unordered one. The algorithm loops for all the elements of the data structure and for every cycle picks the smallest element of the unordered sublist and adds it to the sorted sublist, progressively filling it. It's a really simple and intuitive algorithm that does not require additional memory, but it's not really efficient on big data structures due to its quadratic time complexity. This algorithm has been upgraded and enhanced in several variants such as Heap Sort.",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
  },
  3: {
    name: "Insertion Sort",
    description:
      "Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It's less performant than advanced sorting algorithms, but it can still have some advantages: it's really easy to implement and it's efficient on small data structures almost sorted. The algorithm divides the data structure in two sublists: a sorted one, and one still to sort. Initially, the sorted sublist is made up of just one element and it gets progressively filled. For every iteration, the algorithm picks an element on the unsorted sublist and inserts it at the right place in the sorted sublist. It's available in several variants such as Gnome Sort.",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
  },
  4: {
    name: "Merge Sort",
    description:
      "Merge Sort is a sorting algorithm based on the Divide et Impera technique, like Quick Sort. It can be implemented iteratively or recursively, using the Top-Down and Bottom-Up algorithms respectively. We represented the first one. The algorithm divides the data structure recursively until the subsequences contain only one element. At this point, the subsequences get merged and ordered sequentially. To do so, the algorithm progressively builds the sorted sublist by adding each time the minimum element of the next two unsorted subsequences until there is only one sublist remaining. This will be the sorted data structure.",
    timeComplexity: "O(nlogn)",
    spaceComplexity: "O(n)",
  },
  5: {
    name: "Quick Sort",
    description:
      "Quick Sort is a sorting algorithm based on splitting the data structure in smaller partitions and sort them recursively until the data structure is sorted. This division in partitions is done based on an element, called pivot: all the elements bigger than the pivot get placed on the right side of the structure, the smaller ones to the left, creating two partitions. Next, this procedure gets applied recursively to the two partitions and so on. This partition technique based on the pivot is called Divide and conquer. It's a performant strategy also used by other sorting algorithms, such as Merge Sort.",
    timeComplexity: "O(nlogn)",
    spaceComplexity: "O(logn)",
  },
  // Define similar entries for other algorithms (4 for Merge Sort, 5 for Quick Sort, etc.)
};

const start = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  let speedValue = Number(document.querySelector(".speed-menu").value);

  if (speedValue === 0) {
    speedValue = 1;
  }
  if (algoValue === 0) {
    alert("No Algorithm Selected");
    return;
  }

  let algorithm = new sortAlgorithms(speedValue);
  if (algoValue === 1) await algorithm.BubbleSort();
  if (algoValue === 2) await algorithm.SelectionSort();
  if (algoValue === 3) await algorithm.InsertionSort();
  if (algoValue === 4) await algorithm.MergeSort();
  if (algoValue === 5) await algorithm.QuickSort();
  // Add similar lines for other algorithms (4 for Merge Sort, 5 for Quick Sort, etc.)

  updateAlgorithmInfo(algorithmInfo[algoValue]);
};

const RenderScreen = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  await RenderList();
};

const RenderList = async () => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  const arrayNode = document.querySelector(".array");
  console.log(arrayNode);
  console.log(list);
  for (const element of list) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${3.8 * element}px`;
    arrayNode.appendChild(node);
  }
};

const RenderArray = async (sorted) => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  if (sorted) list.sort((a, b) => a - b);

  const arrayNode = document.querySelector(".array");
  const divnode = document.createElement("div");
  divnode.className = "s-array";

  for (const element of list) {
    const dnode = document.createElement("div");
    dnode.className = "s-cell";
    dnode.innerText = element;
    divnode.appendChild(dnode);
  }
  arrayNode.appendChild(divnode);
};

const randomList = async (Length) => {
  let list = new Array();
  let lowerBound = 1;
  let upperBound = 100;

  for (let counter = 0; counter < Length; ++counter) {
    let randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
    list.push(parseInt(randomNumber));
  }
  return list;
};

const clearScreen = async () => {
  document.querySelector(".array").innerHTML = "";
};

const response = () => {
  let Navbar = document.querySelector(".navbar");
  if (Navbar.className === "navbar") {
    Navbar.className += " responsive";
  } else {
    Navbar.className = "navbar";
  }
};

document.querySelector(".icon").addEventListener("click", response);
document.querySelector(".start").addEventListener("click", start);
document.querySelector(".size-menu").addEventListener("change", RenderScreen);
document.querySelector(".algo-menu").addEventListener("change", () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  if (algoValue === 0) {
    hideAlgorithmInfo();
  } else {
    updateAlgorithmInfo(algorithmInfo[algoValue]);
  }
});
window.onload = RenderScreen;

const updateAlgorithmInfo = (info) => {
  const algorithmInfoSection = document.querySelector(".algorithm-info");
  const algorithmName = document.querySelector(".algorithm-name");
  const algorithmDescription = document.querySelector(".algorithm-description");
  const timeComplexity = document.querySelector(".time-complexity");
  const spaceComplexity = document.querySelector(".space-complexity");

  algorithmName.textContent = info.name;
  algorithmDescription.textContent = info.description;
  timeComplexity.textContent = "Time Complexity: " + info.timeComplexity;
  spaceComplexity.textContent = "Space Complexity: " + info.spaceComplexity;

  algorithmInfoSection.style.display = "block";
};

const hideAlgorithmInfo = () => {
  const algorithmInfoSection = document.querySelector(".algorithm-info");
  algorithmInfoSection.style.display = "none";
};
