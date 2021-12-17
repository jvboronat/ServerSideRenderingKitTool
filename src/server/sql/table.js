
 async function getRows(tablename, paramname,param)
 { 
     
   var sql = require("mssql");

    // config for your database
    var config = {
        user: process.env.USER_NAME,
        password: process.env.PASSWORD,
        server: process.env.DB_SERVER, 
        database: process.env.DBNAME,
        options: {
            encrypt: true,
            enableArithAbort: true
        }        
    };      

    try
    {
        let pool = await sql.connect(config)

        let table = await pool.request()
        .input('param', sql.VarChar, param)        
        .query(`Select *
            From ${tablename}
            Where ${paramname} = @param`);

        return table.recordsets[0];

    }
    catch (error) {
        console.log(error)

    }
}

module.exports = {
    getTable: getRows
}

  