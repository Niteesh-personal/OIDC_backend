export const firstNonRepeatingCharacter = (str: string): string | null => {
    const charCount: Record<string, number> = {};
    for (const char of str) {
        if (/^[a-zA-Z]$/.test(char)) {
            charCount[char] = (charCount[char] || 0) + 1;
        }
    }
    for (const char of str) {
        if (/^[a-zA-Z]$/.test(char) && charCount[char] === 1) {
            return char;
        }
    }
    return null;
};

export const printSpiralMatrix = (N: number): any => {
    if (N <= 0) {
        return;
    }
    const matrix: number[][] = new Array(N).fill([]).map(() => new Array(N).fill(0));
    let num = N * N;
    let rowStart = 0;
    let rowEnd = N - 1;
    let colStart = 0;
    let colEnd = N - 1;
    while (rowStart <= rowEnd && colStart <= colEnd) {
        for (let i = colEnd; i >= colStart; i--) {
            matrix[rowStart][i] = num--;
        }
        rowStart++;
        for (let i = rowStart; i <= rowEnd; i++) {
            matrix[i][colStart] = num--;
        }
        colStart++;
        for (let i = colStart; i <= colEnd; i++) {
            matrix[rowEnd][i] = num--;
        }
        rowEnd--;
        // Traverse right column from bottom to top
        for (let i = rowEnd; i >= rowStart; i--) {
            matrix[i][colEnd] = num--;
        }
        colEnd--;
    }
    // Print the spiral matrix
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            process.stdout.write(matrix[i][j].toString().padStart(3) + ' ');
        }
        console.log();
    }
    return matrix;
};

export const findTwoOddOccurringElementsWithCount = (arr: number[]): { element: number; count: number }[] => {
    if (arr.length < 2) {
        return [];
    }
    const elementCounts = new Map<number, number>();
    for (let num of arr) {
        if (elementCounts.has(num)) {
            elementCounts.set(num, elementCounts.get(num)! + 1);
        } else {
            elementCounts.set(num, 1);
        }
    }

    const oddOccurringElements: { element: number; count: number }[] = [];

    // Iterate through the Map to find elements with odd counts
    for (let [num, count] of elementCounts.entries()) {
        if (count % 2 !== 0) {
            oddOccurringElements.push({ element: num, count });
        }
    }

    return oddOccurringElements;
}



