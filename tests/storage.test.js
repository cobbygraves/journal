import { describe } from "node:test";

describe("storage", () => {
    test("local storage shouldn't contain journal array", () => {
        const journal = localStorage.getItem('journal');
        expect(journal).toBeFalsy();
    });
});