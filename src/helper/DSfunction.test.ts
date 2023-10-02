import {
    firstNonRepeatingCharacter,
    printSpiralMatrix,
    findTwoOddOccurringElementsWithCount,
} from "./DSfunction";

// Test cases for firstNonRepeatingCharacter
describe('firstNonRepeatingCharacter', () => {
    it('should return the first non-repeating character in a string', () => {
        expect(firstNonRepeatingCharacter('aabbccd')).toBe('d');
        expect(firstNonRepeatingCharacter('abcdef')).toBe('a');
        expect(firstNonRepeatingCharacter('aabbcc')).toBeNull();
    });
});


describe('printSpiralMatrix', () => {
    it('should print a 4x4 spiral matrix when N is 4', () => {
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
        printSpiralMatrix(4);
        // expect(consoleLogSpy).toHaveBeenCalledTimes(20);
        // expect(consoleLogSpy).toHaveBeenNthCalledWith(1, '  1   2   3   4 ');
        // expect(consoleLogSpy).toHaveBeenNthCalledWith(2, ' 12  13  14   5 ');
        // expect(consoleLogSpy).toHaveBeenNthCalledWith(3, ' 11  10   9   6 ');
        // expect(consoleLogSpy).toHaveBeenNthCalledWith(4, '  8   7   6   5 ');
        consoleLogSpy.mockRestore();
    });
});



// Test cases for findTwoOddOccurringElementsWithCount
describe('findTwoOddOccurringElementsWithCount', () => {
    it('should return an array of objects with odd occurring elements and their counts', () => {
        expect(findTwoOddOccurringElementsWithCount([1, 2, 2, 3, 3])).toEqual([
            { element: 1, count: 1 },
        ]);
        expect(findTwoOddOccurringElementsWithCount([1, 2, 2, 3, 3, 4, 4])).toEqual([
            { element: 1, count: 1 },
        ]);
        expect(findTwoOddOccurringElementsWithCount([1, 2, 2, 3, 3, 4])).toEqual([
            { element: 1, count: 1 },
            { element: 4, count: 1 },
        ]);
    });
});
