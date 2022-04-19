import { db } from './tokenDBConnection.js';

await deleteDb();
await createDB();


export async function createDB(){
    await db.exec(`CREATE TABLE IF NOT EXISTS tokens(
        id INTEGER PRIMARY KEY,
        token VARCHAR(1250) NOT NULL
        )`);
    await db.run(`INSERT INTO tokens(id, token) values
    (2 , '4tre4545sdasddfa56sa3432d'),
    (3 , '4545w123sdadssda56sa23423d'),
    (4 , '4er5434545sdasd32432a56sad'),
    (5 , '41eq3541345sdasda56ssadadweq43g4ad')
    `);
}
export async function deleteDb(){
    await db.exec("DROP TABLE IF EXISTS tokens");
}

export async function insertToken(id, token){
    await db.run(`INSERT INTO tokens(id, token) values
    (? , ?)`, [id, token]);
}
export async function getToken(id){
    return await db.get('SELECT * FROM tokens WHERE id = ?', id)
}
export async function getTokens(){
    return await db.all('SELECT * FROM tokens')
}
export async function rmToken(id){
    await db.exec()
}




