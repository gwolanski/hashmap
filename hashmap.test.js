const hashMap = require('./hashmap')

test('If key is not string, throw error', () => {
    const newHashMap = hashMap();
    const badHash = () => newHashMap.hash(502, 10);
    expect(badHash).toThrow(Error);
}),

test('Key of the word cat should return hashCode of 2', () => {
    const newHashMap = hashMap();
    expect(newHashMap.hash('cat', 5)).toBe(2);
} )