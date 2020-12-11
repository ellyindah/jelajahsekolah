var developmentDatabase = {
    postgres: {
    host: 'ec2-54-170-190-29.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'd7m13lr7eqsvs9',
    user: 'kbcnjbtzamvexe',
    password: '90f4dc7036b1cf1c8825954d6ad1be9b5ac55cd2a8637cb5ef647c5875efb13a'
    }
    }
    
    var connectionString = "kbcnjbtzamvexe:90f4dc7036b1cf1c8825954d6ad1be9b5ac55cd2a8637cb5ef647c5875efb13a@ec2-54-170-190-29.eu-west-1.compute.amazonaws.com:5432/d7m13lr7eqsvs9?ssl=true";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = developmentDatabase.postgres.ssl = { rejectUnauthorized: false };
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }