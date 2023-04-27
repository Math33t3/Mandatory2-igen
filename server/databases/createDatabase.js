import db from "./connection.js";

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;

if(isDeleteMode) {
    db.exec(`DROP TABLE users;`);
}
db.exec(
    `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT,
        email TEXT
    );
    `
);

if (isDeleteMode) {
    db.exec(`INSERT INTO users (username, password, email) VALUES ('admin', '$2b$08$fqvbAx/Y5ZqGKtU6wiNdUOhFn1ixNV6FlK85nGPpx1.rx7JlyU5G2','123@321.gmail.com')`);
};