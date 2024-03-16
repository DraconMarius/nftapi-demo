import { openDB } from 'idb';

//idb setup
const initdb = async () =>
    openDB('demoDB', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('demoDB')) {
                console.log('demoDB already exists');
                return;
            };
            db.createObjectStore('demoDB', { keyPath: 'id', autoIncrement: true });
            console.log('demoDB created');
        }
    });

/**
 * 
 * @param {*} key
 * take in api key and storing the string in client side demoDB 
 * @returns object of {1, key}
 */
export const updateAPIKey = async (key) => {
    const demoDB = await openDB('demoDB', 1);
    const tx = demoDB.transaction('demoDB', 'readwrite'); //setting permission
    const store = tx.objectStore('demoDB');
    const req = store.put({ id: 1, key: key });
    const res = await (req);
    return res;
}

/**
 * 
 * @returns all of the database, because I might want user to be able to toggle between multiple API keys later on if the needs arises
 */
export const getAPIKey = async () => {
    const demoDB = await openDB('demoDB', 1);
    const tx = demoDB.transaction('demoDB', 'readonly');
    const store = tx.objectStore('demoDB');
    const req = store.getAll();
    const res = await (req);
    console.log(res)
    return res;
}

//running init
initdb();