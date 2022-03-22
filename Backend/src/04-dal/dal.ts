import mysql from "mysql";
import config from "../01-utils/config";

// Create a pool of connections for connecting to MySQL database:
//כך אנו מתחברים לדאטה בייס שלנו 
const connection = mysql.createPool({
    host: config.mysql.host, // Computer name where the database exists.
    user: config.mysql.user, // Database username
    password: config.mysql.password, // Database password
    database: config.mysql.database, // Database name 
});

// sql: "SELECT * FROM Products"
//פונ' אשר מקבלת את השאילתת אסקיואל ומשתנים אאשר יחליפו את סימני השאלה בשאילתה
function execute(sql: string, values?: any[]): Promise<any> {

    // Promisify sql access:
    return new Promise<any>((resolve, reject) => {

        // Execute SQL query:
        //כך אנו שולחים לדאטה בייס את השאילתה והמערכת יודעת לחבר את המשתנים לסימני השאלה בשאילתה
        connection.query(sql, values, (err, result) => {

            // On error - report the error: 
            if(err) {
                reject(err);
                return;
            }

            // On success - report the return data: 
            resolve(result);
        });
    });
}

export default {
    execute
};
