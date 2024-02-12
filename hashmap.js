class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null
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
        //add logic to check load factor and grow if necessary 
        
        const index = this.hash(key);
        console.log(`key ${key}, index ${index}`)
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
                console.log('currentNode.next: ' + currentNode.next)
            } 
        }
    }
}

module.exports = {
    HashMap,
    Node
}

//carlos 
//C:  (31 * 0 + 67) % 16 = 3
//a: (31* 3 + 97) % 16 = 14
//r: (31 * 14 + 114) % 16 = 4
//l: (31 * 4 + 108) % 16 = 8
//o: (31 * 8 + 111) % 16 = 7
//s: (31 * 7 + 115) % 16 = 12

//banana
//b: (31 * 0 + 98) % 16 = 2
//a: (31 * 2 + 97) % 16 = 15
//n: (31 * 5 + 110) % 16 = 9
//a: (31 * 9 + 97) % 16 = 8
//n: (31 * 8 + 110) % 16 = 6
//a: (31 * 6 + 97) % 16 = 11

//open 

//o: (31 * 0 + 111) % 16 = 15
//p: 
//e: 
//n: 
