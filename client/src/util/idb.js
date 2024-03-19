import { openDB, deleteDB } from 'idb';

//idb setup
export const initdb = async () =>
    openDB('demoDB', 2, {
        upgrade(db) {
            if (db.objectStoreNames.contains('demoDB')) {
                console.log('demoDB already exists');
                return;
            };
            db.createObjectStore('demoDB', { keyPath: 'id', autoIncrement: true });
            console.log('demoDB created');
        }
    });

//destruct db
export const resetDB = async () => {
    await deleteDB('demoDB');
    await initdb();
}

/**
 * 
 * @param {*} key
 * take in api key and storing the string in client side demoDB 
 * @returns object of {1, key}
 */
export const updateAPIKey = async (key) => {
    const demoDB = await openDB('demoDB', 2);
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
    const demoDB = await openDB('demoDB', 2);
    const tx = demoDB.transaction('demoDB', 'readonly');
    const store = tx.objectStore('demoDB');
    const req = store.getAll();
    const res = await (req);
    // console.log(res)
    // console.log(typeof res)
    return res;
}

/**
 * 
 * @param {*} (1) id
 * take in id which is always 1 for now, and delete it 
 * @returns 
 */
export const deleteDb = async (id) => {
    console.log('DELETE from the database', id);
    const todosDb = await openDB('todosDB', 1);
    const tx = todosDb.transaction('todos', 'readwrite');
    const store = tx.objectStore('todos');
    const request = store.delete(id);
    const result = await request;
    console.log('result.value', result);
    return result;
};

initdb()