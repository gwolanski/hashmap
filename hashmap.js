class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashMap {
    constructor() {
        this.bucketCapacity = 16,
        this.loadFactor = 0.75,
        this.buckets= []
    }

    hash(key) {
        if (typeof key !== 'string') {
            throw new Error('Key must be a string')
        }
        let hashCode = 0;   
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.bucketCapacity;
        }
     
        return hashCode;
      }
    
    set(key, value) {
        if (this.isLoadFactorExceeded()) {
            this.resize();
        }

        const index = this.hash(key);
        const newNode = new Node(key, value);

        if (index < 0 || index >= this.bucketCapacity) {
            throw new Error('Trying to access index out of bounds');
        } else {
            if (!this.buckets[index]) {
                this.buckets[index] = newNode;
            } else {
                let currentNode = this.buckets[index];
                while (currentNode) {
                    if (currentNode.key === key) {
                        currentNode.value = value;
                        return;
                    }
                    if (!currentNode.next) {
                        break;
                    }
                    currentNode = currentNode.next;
                }
                currentNode.next = newNode;
            } 
        }
    }

    get(key) {
        const index = this.hash(key);
        let currentNode = this.buckets[index];

        if (!currentNode) {
            return null;
        } else {
            while (currentNode) {
                if (currentNode.key === key) {
                    return currentNode;
                } else {
                    if (!currentNode.next) {
                        return null;
                    } else {
                        currentNode = currentNode.next;
                    }
                }
            }
            
        }
    }

    has(key) {
        const node = this.get(key);
        return node !== null;
    }

    remove(key) {
        const isKeyInHashMap = this.has(key);

        if (!isKeyInHashMap) {
            return false;
        } else {
            const index = this.hash(key);
            let currentNode = this.buckets[index];
            let previousNode = null;

            while (currentNode) {
                if (currentNode.key === key) {
                    if (previousNode === null) {
                        this.buckets[index] = currentNode.next;
                    } else {
                        previousNode.next = currentNode.next;
                    }
                    return true;
                }
                previousNode = currentNode;
                currentNode = currentNode.next;
            }
        }
    }

    length() {
        let count = 0;
        for (const bucket of this.buckets) {
            if (bucket !== null && bucket !== undefined) {
                let currentNode = bucket;
                while (currentNode !== null) {
                    count++;
                    if (!currentNode.next) {
                        break;
                    } else {
                        currentNode = currentNode.next;
                    }
                }
            }
        }
        return count;
    }

    clear() {
        this.buckets = [];
    }

    keys() {
        let keys = [];

        for (const bucket of this.buckets) {
            if (bucket !== null && bucket !== undefined) {
                let currentNode = bucket;
                while (currentNode !== null) {
                    keys.push(currentNode.key);
                    if (!currentNode.next) {
                        break;
                    } else {
                        currentNode = currentNode.next;
                    }
                }
            }
        }
        return keys;
    }

    values() {
        let values = [];

        for (const bucket of this.buckets) {
            if (bucket !== null && bucket !== undefined) {
                let currentNode = bucket;
                while (currentNode !== null) {
                    values.push(currentNode.value);
                    if (!currentNode.next) {
                        break;
                    } else {
                        currentNode = currentNode.next;
                    }
                }
            }
        }
        return values;
    }

    entries() {
        let keyValuePairs = [];

        for (const bucket of this.buckets) {
            if (bucket !== null && bucket !== undefined) {
                let currentNode = bucket;
                while (currentNode !== null) {
                    keyValuePairs.push([`${currentNode.key}`, `${currentNode.value}`]);
                    if (!currentNode.next) {
                        break;
                    } else {
                        currentNode = currentNode.next;
                    }
                }
            }
        }
        return keyValuePairs;
    }

    isLoadFactorExceeded() {
        const currentNumberOfObjects = this.length() + 1;
        const maxNumberOfObjects = this.loadFactor * this.bucketCapacity;
        return (currentNumberOfObjects > maxNumberOfObjects);
    }

    resize() {
        const currentBuckets = this.buckets;
        const newCapacity = this.bucketCapacity * 2;
        this.clear();

        currentBuckets.forEach(bucket => {
            let currentNode = bucket;
            while (currentNode) {
                const newIndex = this.hash(currentNode.key, newCapacity);
                const newNode = new Node(currentNode.key, currentNode.value);

                if (!this.buckets[newIndex]) {
                    this.buckets[newIndex] = newNode;
                } else {
                    let currentTail = this.buckets[newIndex];
                    while (currentTail.next) {
                        currentTail = currentTail.next;
                    }
                    currentTail.next = newNode;
                }
                currentNode = currentNode.next;
            }
        });
        this.bucketCapacity = newCapacity;
    }
}

module.exports = {
    HashMap,
    Node
}