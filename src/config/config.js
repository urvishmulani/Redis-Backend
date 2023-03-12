require('dotenv').config();

//const port = normalizePort(process.env.PORT || '3000');
const port=process.env.PORT
const dbUser=process.env.DB_USERNAME
const dbPwd=process.env.DB_PASSWORD

module.exports={port,dbUser,dbPwd}
