import { convertScientificToHelmholtz } from "../pitchNotationUtils"

describe('scientific To Helmholtz', () => {
    describe.each(
        [['C4', 'c1'], ['B5', 'b2'], ['A6', 'a3'], ['G7', 'g4'],
        ['F3', 'f'], ['E2', 'E'], ['D1', 'D1'], ['B0', 'B2']]
    )('from %s to %s', (from: string, to: string) => {
        test('convert accurate', () => {
            expect(convertScientificToHelmholtz(from)).toEqual(to);
        })
    })

    test('incorrect length will throw', () => {
        expect(() => convertScientificToHelmholtz('abc')).toThrow();
    })
})

