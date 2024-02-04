class Node {
    constructor (key, value)
    {
        this.key = key;
        this.value = value;
        this.next = null;
    }

    updateNext (nextNode) 
    {
        this.next = nextNode;
    }
}