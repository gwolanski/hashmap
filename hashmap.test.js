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
}),

test('HashMap remove() function will return false if a specified key is not in the hash map', () => {
    const newHashMap = new HashMap();

    newHashMap.set('grass', 'initial value');
    
    expect(newHashMap.remove('dog')).toBeFalsy();
    expect(newHashMap.remove('AaAa')).toBeFalsy();
}),

test('HashMap remove() function will return true if a specified key is in the hash map', () => {
    const newHashMap = new HashMap();

    newHashMap.set('cactus', 'initial value');
    newHashMap.set('AaBB', 'initial value');
    newHashMap.set('BBAa', 'initial value');
    
    expect(newHashMap.remove('AaBB')).toBeTruthy();
    expect(newHashMap.remove('BBAa')).toBeTruthy();
    expect(newHashMap.remove('cactus')).toBeTruthy();
}),

test('HashMap remove() function removes specified key', () => {
    const newHashMap = new HashMap();

    newHashMap.set('cactus', 'initial value');
    newHashMap.set('AaBB', 'initial value');
    newHashMap.set('BBAa', 'initial value');
    newHashMap.set('yellow');

    newHashMap.remove('BBAa');
    newHashMap.remove('cactus');
    newHashMap.remove('AaBB');
    newHashMap.remove('yellow');

    expect(newHashMap.has('BBAa')).toBeFalsy;
    expect(newHashMap.has('cactus')).toBeFalsy;
    expect(newHashMap.has('AaBB')).toBeFalsy;
    expect(newHashMap.has('yellow')).toBeFalsy;
}),

test('HashMap length() function correctly returns # of set keys in hashmap', () => {
    const newHashMap = new HashMap();    
    
    newHashMap.set('cactus', 'initial value');
    newHashMap.set('AaBB', 'initial value');
    newHashMap.set('BBAa', 'initial value');
    newHashMap.set('yellow', 'initial value');

    expect(newHashMap.length()).toEqual(4);
}),

test('HashMap length() function correclty returns # of keys after one or more keys removed', () => {
    const newHashMap = new HashMap();    
    
    newHashMap.set('cactus', 'initial value');
    newHashMap.set('AaBB', 'initial value');
    newHashMap.set('BBAa', 'initial value');
    newHashMap.set('yellow', 'initial value');

    newHashMap.remove('yellow');
    newHashMap.remove('BBAa');
    newHashMap.remove('cactus');

    expect(newHashMap.length()).toEqual(1);
}),

test('HashMap clear() function removes all entries in the hashmap', () => {
    const newHashMap = new HashMap();    
    
    newHashMap.set('cactus', 'initial value');
    newHashMap.set('AaBB', 'initial value');
    newHashMap.set('BBAa', 'initial value');
    newHashMap.set('yellow', 'initial value');

    newHashMap.clear();

    expect(newHashMap.length()).toEqual(0);
    expect(newHashMap.has('AaBB')).toBeFalsy;
    expect(newHashMap.get('yellow')).toBeNull;
}),

test('HashMap keys() function returns all keys in the hashmap', () => {
    const newHashMap = new HashMap();    
    
    newHashMap.set('cactus', 'initial value');
    newHashMap.set('AaBB', 'initial value');
    newHashMap.set('BBAa', 'initial value');
    newHashMap.set('yellow', 'initial value');

    expect(newHashMap.keys()).toContain('BBAa');
    expect(newHashMap.keys()).toContain('yellow');
    expect(newHashMap.keys()).toContain('AaBB');
    expect(newHashMap.keys()).toContain('cactus');
}),

test('HashMap values() function returns all values in the hashmap', () => {
    const newHashMap = new HashMap();    
    
    newHashMap.set('cactus', 'initial value');
    newHashMap.set('AaBB', 'another value');
    newHashMap.set('BBAa', 'value');
    newHashMap.set('yellow', 'something');

    expect(newHashMap.values()).toContain('initial value');
    expect(newHashMap.values()).toContain('another value');
    expect(newHashMap.values()).toContain('value');
    expect(newHashMap.values()).toContain('something');
}),

test('HashMap entries() function returns all key value pairs in the hashmap', () => {
    const newHashMap = new HashMap();    
    
    newHashMap.set('cactus', 'initial value');
    newHashMap.set('AaBB', 'another value');
    newHashMap.set('BBAa', 'value');
    newHashMap.set('yellow', 'something');

    expect(newHashMap.entries().includes(['cactus','initial value'])).toBeTruthy;
    expect(newHashMap.entries().includes(['BBAa', 'value'])).toBeTruthy;
    expect(newHashMap.entries().includes(['random','test'])).toBeFalsy;
}),

test('HashMap should resize when load factor is exceeded', () => {
    const newHashMap = new HashMap();
    //setting small capacity and load factor for testing purposes
    newHashMap.bucketCapacity = 4;
    newHashMap.loadFactor = 0.5; 

    newHashMap.set('key1', 'value1');
    newHashMap.set('key2', 'value2');

    expect(newHashMap.bucketCapacity).toBe(4);

    newHashMap.set('key3', 'value3');

    expect(newHashMap.bucketCapacity).toBe(8);

    expect(newHashMap.entries().includes(['key1', 'value1'])).toBeTruthy;
    expect(newHashMap.entries().includes(['key2', 'value2'])).toBeTruthy;
    expect(newHashMap.entries().includes(['key3', 'value3'])).toBeTruthy;
});
