import express from 'express';
import path from 'path';
import React from 'react';
import ReactDom from 'react-dom/server';

const app = express();

app.use(express.json()) 

require('dotenv').config();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/static', express.static(path.join(__dirname, '..', '..', 'dist', 'static')));

app.post( '/ServerSideRendering/:tablename/:paramname/:param', async (req, res) => {  

    const {tablename, paramname, param} = req.params;
    const {body} = req;
    console.log(body)

    
     const table = require('./sql/table')

    let Table = {}
   
     await table.getTable(tablename, paramname,param)
        .then(dataset => 
        {
            Table = dataset;   
        }
    )     
    
    //console.log(Table)

    let data = {
        tit: "This is a Server Side Rendering Tool Kit",
        param,
        tablename,
        table: Table
    }
   
    const root = (
        <html>
            <body>
                <div id="root">
                    
                </div>

                { <script
                    dangerouslySetInnerHTML={{
                        __html: `window.__data__ = ${JSON.stringify(data)};`
                    }}
                /> }
                <script src="/static/bundle.js"></script>
            </body>
        </html>
    );
    const html = ReactDom.renderToString(root);

    res.send(html);
});

app.listen(process.env.PORT, () => {
    console.log(`server started at http://${process.env.SERVER}:${process.env.PORT}`)
});
