const hashMap = require('./hashmap')

test('If key is not string, throw error', () => {
    const newHashMap = hashMap();
    const badHash = () => newHashMap.hash(502, 10);
    expect(badHash).toThrow(Error);
})