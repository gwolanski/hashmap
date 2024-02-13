const HashMap = require('./hashmap').HashMap;
const Node = require('./hashmap').Node;

test('If key is not string, throw error', () => {
    const newHashMap = new HashMap();
    const badHash = () => newHashMap.hash(502, 10);
    expect(badHash).toThrow(Error);
}),

test('Key of the word cat should return hashCode of 6 when arrayLength 16', () => {
    const newHashMap = new HashMap();
    expect(newHashMap.hash('cat')).toBe(6);
}),

test('HashMap set() function will set the key value pair at index from hash() function', () => {
    const newHashMap = new HashMap();
    newHashMap.set('Carlos', 'initial value');
    let index = newHashMap.hash('Carlos');

    expect(newHashMap.buckets[index].key).toBe('Carlos');
    expect(newHashMap.buckets[index].value).toBe('initial value');
}),

test('HashMap set() function will update the value of a key if setting an existing key', () => {
    const newHashMap = new HashMap();
    newHashMap.set('Carlos', 'initial value');
    newHashMap.set('Carlos', 'updated value');
    let index = newHashMap.hash('Carlos');

    expect(newHashMap.buckets[index].key).toBe('Carlos');
    expect(newHashMap.buckets[index].value).toBe('updated value');
}),

test('HashMap set() function will create linked list if more than 1 key value pair at a certain index', () => {
    const newHashMap = new HashMap();
    newHashMap.set('AaBB', 'initial value');
    newHashMap.set('BBAa', 'initial value');
    newHashMap.set('AaAa', 'initial value');
    let index = newHashMap.hash('AaBB');

    expect(newHashMap.buckets[index].key).toBe('AaBB');
    expect(newHashMap.buckets[index].next.key).toBe('BBAa');
    expect(newHashMap.buckets[index].next.next.key).toBe('AaAa');
}),

test('HashMap get() function will return null if there is no node at specified index', () => {
    const newHashMap = new HashMap();
 
    expect(newHashMap.get('random')).toBeNull();
}),

test('HashMap get() function will return null if the input key doesnt exist at specified index', () => {
    const newHashMap = new HashMap();
    newHashMap.set('AaBB', 'initial value'); 

    expect(newHashMap.get('BBAa')).toBeNull();
}),

test('HashMap get() function will return the node if input key matches bucket key', () => {
    const newHashMap = new HashMap();
    newHashMap.set('AaBB', 'initial value');
    const node = newHashMap.get('AaBB');

    expect(node).not.toBeNull();
    expect(node.key).toBe('AaBB');
}),

test('HashMap get() function will return the correct node if a bucket has multiple key value pairs', () => {
    const newHashMap = new HashMap();
    newHashMap.set('AaBB', 'initial value');
    newHashMap.set('BBAa', 'initial value');
    newHashMap.set('AaAa', 'initial value');
    const node = newHashMap.get('AaAa');

    expect(node).not.toBeNull();
    expect(node.key).toBe('AaAa');
}),

test('HashMap has() function will return true if a specified key is in the hash map', () => {
    const newHashMap = new HashMap();
    newHashMap.set('AaBB', 'initial value');
    
    expect(newHashMap.has('AaBB')).toBeTruthy();
}), 

test('HashMap has() function will return true if a specified key is in the hash map when there are multiple keys in a bucket', () => {
    const newHashMap = new HashMap();
    newHashMap.set('AaBB', 'initial value');
    newHashMap.set('BBAa', 'initial value');
    newHashMap.set('AaAa', 'initial value');
    
    expect(newHashMap.has('AaAa')).toBeTruthy();
    expect(newHashMap.has('BBAa')).toBeTruthy();
    expect(newHashMap.has('AaBB')).toBeTruthy();
}),

test('HashMap has() function will return false if a specified key is not in the hash map', () => {
    const newHashMap = new HashMap();
    newHashMap.set('AaBB', 'initial value');
    
    expect(newHashMap.has('dog')).toBeFalsy();
    expect(newHashMap.has('AaAa')).toBeFalsy();
})