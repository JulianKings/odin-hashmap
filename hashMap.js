class HashMap {
    constructor()
    {
        // initial size is 16
        this.bucketList = [];
        this.capacity = 16;
        this.loadFactor = 0.75;

        for(let i = 0; i < this.capacity; i++)
        {
            this.bucketList.push(new Bucket())
        }
    }

    hash(key)
    {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;

    }

    getBucket(index)
    {
        if (index < 0 || index >= this.bucketList.length) {
            throw new Error("Trying to access index out of bound");
        }

        return this.bucketList[index];
    }

    amplifyHashMap()
    {
        const saveEntries = this.entries();
        this.bucketList = [];
        this.capacity = (this.capacity) * 2;

        for(let i = 0; i < this.capacity; i++)
        {
            this.bucketList.push(new Bucket())
        }

        // append the old values
        saveEntries.forEach((entry) => {
            this.set(entry[0], [entry[1]]); // append the old values
        })
    }


    set(key, value)
    {
        if((this.size() / this.capacity) > this.loadFactor)
        {
            // if we've surpassed the load factor, amplify our hash map
            this.amplifyHashMap();
        }

        let hashKey = this.hash(key);
        let bucketIndex = hashKey % this.capacity;
        let currentBucket = this.getBucket(bucketIndex);

        if(currentBucket.find(key) === null)
        {
            currentBucket.append(key, value);
        } else {
            let currentNode = currentBucket.at(currentBucket.find(key));
            currentNode.value = value;
        }
    }

    get(key)
    {
        let hashKey = this.hash(key);
        let bucketIndex = hashKey % this.capacity;
        let currentBucket = this.getBucket(bucketIndex);

        if(currentBucket.find(key) === null)
        {
            return null;
        } else {
            let currentNode = currentBucket.at(currentBucket.find(key));
            return currentNode.value;
        }

    }

    has(key)
    {
        if(this.get(key) === null)
        {
            return false;
        }

        return true;
    }

    remove(key)
    {
        if(this.has(key))
        {
            // remove the entry
            let hashKey = this.hash(key);
            let bucketIndex = hashKey % this.capacity;
            let currentBucket = this.getBucket(bucketIndex);
            
            if(currentBucket.find(key) === null)
            {
                // how?
                return false;
            } else {
                let currentNode = (currentBucket.find(key));
                currentBucket.removeAt(currentNode);
                return true;
            }
        }

        return false;
    }

    size()
    {
        return this.bucketList.reduce((accumulator, currentBucket) => {
            return +(accumulator) + (currentBucket.size());
        }, 0)

    }

    clear()
    {
        // regenerate the hash map
        this.capacity = 16;
        this.bucketList = [];
        for(let i = 0; i < this.capacity; i++)
        {
            this.bucketList.push(new Bucket())
        }
    }

    keys()
    {
        let keyArray = [];
        for(let index = 0; index < this.bucketList.length; index++)
        {
            let currentBucket = this.bucketList[index];
            if(currentBucket.size() > 0)
            {
                for(let i = 0; i < currentBucket.size(); i++)
                {
                    keyArray.push(currentBucket.at(i).key);
                }
            }
        }

        return keyArray;
    }

    values()
    {
        let keyArray = [];
        for(let index = 0; index < this.bucketList.length; index++)
        {
            let currentBucket = this.bucketList[index];
            if(currentBucket.size() > 0)
            {
                for(let i = 0; i < currentBucket.size(); i++)
                {
                    keyArray.push(currentBucket.at(i).value);
                }
            }
        }

        return keyArray;
    }

    entries()
    {
        let keyArray = [];
        for(let index = 0; index < this.bucketList.length; index++)
        {
            let currentBucket = this.bucketList[index];
            if(currentBucket.size() > 0)
            {
                for(let i = 0; i < currentBucket.size(); i++)
                {
                    keyArray.push([currentBucket.at(i).key, currentBucket.at(i).value]);
                }
            }
        }

        return keyArray;
    }
}