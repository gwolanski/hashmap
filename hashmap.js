function hashMap() {
    return {
        hash(key, arrayLength) {
            if (typeof key !== 'string') {
                throw new Error('Key must be a string')
            }
            let hashCode = 0;
               
            const primeNumber = 31;
            for (let i = 0; i < key.length; i++) {
              hashCode = [primeNumber * hashCode + key.charCodeAt(i)] % arrayLength;
            }
         
            return hashCode;
          }
    }
}

module.exports = hashMap;