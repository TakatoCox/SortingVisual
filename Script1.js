
var array = [];
var max = 12.5;
var min = 5;
var arrayLength; //maximum 400
var frameSpeed;
var barHeightScale = 50;



/*removes all buttons after a array selection is made*/
function removeButtons() {

    var itemToRemove = document.getElementById('ten');
    itemToRemove.parentNode.removeChild(itemToRemove);

    var itemToRemove1 = document.getElementById('fifty');
    itemToRemove1.parentNode.removeChild(itemToRemove1);

    var itemToRemove2 = document.getElementById('hundred');
    itemToRemove2.parentNode.removeChild(itemToRemove2);

    var itemToRemove3 = document.getElementById('twoHundred');
    itemToRemove3.parentNode.removeChild(itemToRemove3);

    var itemToRemove4 = document.getElementById('threeHundred');
    itemToRemove4.parentNode.removeChild(itemToRemove4);

    var itemToRemove5 = document.getElementById('fourHundred');
    itemToRemove5.parentNode.removeChild(itemToRemove5);

    //remove instruction
    var itemToRemove6 = document.getElementById('instruction');
    itemToRemove6.parentNode.removeChild(itemToRemove6);

    //instruction to refresh page
    var itemToRemove7 = document.getElementById('arraySize');
    itemToRemove7.innerHTML = "(Refresh Page To Select New Array Size)";
    itemToRemove7.setAttribute("style", "font-size: 20px; padding-top: 5px");
}


//remove insertion and selection when array size of 300, or 400 is chosen
//algorithm is too slow at that size
function removeAlgo() {
    var itemToRemove8 = document.getElementById('insert');
    itemToRemove8.parentNode.removeChild(itemToRemove8);

    var itemToRemove9 = document.getElementById('select');
    itemToRemove9.parentNode.removeChild(itemToRemove9);
}


/*buttons for array size */

////// 400 ////////
document.getElementById('fourHundred').onclick = function () {
    arrayLength = 400;
    frameSpeed = 1;
    removeButtons();
    createBars();
    //removeAlgo();
}
///////////// 300 ///////////////////
document.getElementById('threeHundred').onclick = function () {
    arrayLength = 300;
    frameSpeed = 4;
    removeButtons();
    createBars();
    //removeAlgo();
}
///////////// 200 ///////////////////
document.getElementById('twoHundred').onclick = function () {
    arrayLength = 200;
    frameSpeed = 9;
    removeButtons();
    createBars();
}
///////////// 100 ///////////////////
document.getElementById('hundred').onclick = function () {
    arrayLength = 100;
    frameSpeed = 12;
    removeButtons();
    createBars();
}
///////////// 50 ///////////////////
document.getElementById('fifty').onclick = function () {
    arrayLength = 50;
    frameSpeed = 15;
    removeButtons();
    createBars();
}
///////////// 10 ///////////////////
document.getElementById('ten').onclick = function () {
    arrayLength = 10;
    frameSpeed = 50;
    removeButtons();
    createBars();
}


//////////// functions ////////////////

/*function  that creates the bars*/
function createBars() {
    for (var i = 0; i < arrayLength; i++) {
        array.push((Math.random() * (max)) + 1);
    }

    for (var b in array) {
        var newElement = document.createElement('div');
        newElement.id = b; newElement.className = "bar";
        //newElement.innerHTML = '_';
        newElement.setAttribute("style", "align-self: flex-end; width: 1px; background-color: #FF8C00; margin-top: 10px; margin-left: 1px; width:" + 1000 / arrayLength + "px; height:" + array[b] * barHeightScale + "px;");
        document.getElementById('bars').appendChild(newElement);
    }
}

/* slow down function excecution speed */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* swap two values in an array */
async function swap(arr, a, b) {
    await sleep(frameSpeed);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

/*draw function*/
function draw(arr) {
    for (var i = 0; i < arrayLength; i++) {
        document.getElementById(i).style.height = arr[i] * 50 + "px";
    }
}


////////////////////////////////////////////// Quick Sort ////////////////////////////////////////////////////////////////

/*start quick sort on click*/
document.getElementById('quick').onclick = function () {
    quickSort(array, 0, arrayLength - 1);
}


async function partition(arr, lo, hi) {
    draw(array);


    var pivot = arr[hi];
    var i = lo - 1;
    for (j = lo; j <= arr.length - 1; j++) {
        if (arr[j] < pivot) {
            draw(array);
            i++;
            await swap(arr, i, j);
        }
    }
    await swap(arr, i + 1, hi);
    return i + 1;
}


async function quickSort(arr, lo, hi) {
    if (lo < hi) {
        var index = await partition(arr, lo, hi);

        document.getElementById(index).style.backgroundColor = "red";
        await sleep(frameSpeed*3);
        document.getElementById(index).style.backgroundColor = "#FF8C00";


        await quickSort(arr, lo, index - 1);
        await quickSort(arr, index + 1, hi);
    } 
    draw(array);
}

///////////////////////////////////////////////////////////// Merge Sort ////////////////////////////////////////////////////////////
async function mergeSort(arr, l, r) {
    //draw(array);

    if (l < r) {

        var m = l + Math.floor((r - l) / 2);

        document.getElementById(m).style.backgroundColor = "red";
        await sleep(frameSpeed * 2);
        document.getElementById(m).style.backgroundColor = "#FF8C00";

        await  mergeSort(arr, l, m);
        await mergeSort(arr, m + 1, r);
        await merge(arr, l, m, r);
    }


    //draw(array);
}

async function merge(arr, l, m, r) {

    var i;
    var j;
    var k;
    var n1 = m - l + 1;
    var n2 = r - m    /* create temp arrays */
    var L = [];
    var R = [];

    //draw(array);


/* Copy data to temp arrays L[] and R[] */

    for (i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    /* Merge the temp arrays back into arr[l..r]*/
    i = 0;
    j = 0;
    k = l;

    draw(array); 

    while (i < n1 && j < n2) {
        draw(array);

        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
            await sleep(frameSpeed);
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    /* Copy the remaining elements of L[], if there are any */
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    /* Copy the remaining elements of R[], if there are any */
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
    draw(array);
    await sleep(frameSpeed * 10);
}

document.getElementById('merge').onclick = function () {
    mergeSort(array, 0, arrayLength - 1);
}

///////////////////////////////////////////////////////////// Insertion Sort ////////////////////////////////////////////////////////////

async function insertionSort(arr, n)
{
    var i;
    var key;
    var j;



    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;
        await sleep(20);
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
            draw(array); 
        }
        arr[j + 1] = key;
        document.getElementById(i).style.backgroundColor = "#FF8C00";
        document.getElementById(i+1).style.backgroundColor = "red";
    }


}  


document.getElementById('insert').onclick = function () {
    insertionSort(array, arrayLength);
    frameSpeed = 0.01;
}

///////////////////////////////////////////////////////////// Selection Sort ////////////////////////////////////////////////////////////

async function selectionSort(arr, n)
{
    var i;
    var j;
    var key;

    for (i = 0; i < n - 1; i++) {
        key = i;
        for (j = i + 1; j < n; j++) {
            if (arr[j] < arr[key]) {
                key = j;
                await sleep(0.0000001);
                //document.getElementById(key).style.backgroundColor = "blue";
            }
        }
        document.getElementById(i).style.backgroundColor = "#FF8C00";
        if (i != n-2) {
            document.getElementById(i + 1).style.backgroundColor = "red";
        }
        await swap(arr, key, i);
        draw(array);
    }
}  



document.getElementById('select').onclick = async function () {
    await selectionSort(array, arrayLength);
    //document.getElementById(arrayLength).style.backgroundColor = "purple";
}
