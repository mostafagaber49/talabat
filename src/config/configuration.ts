export default() => ({
database: {
    url : process.env.DB_URL

},

redis : {

    host: process.env.REDIS_URL,
    port: 6379
},

jwt : 

{
    accessSecret : process.env.ACCESS_TOKEN_SECRET,
    refreshsecret: process.env.REFRESH_TOKEN_SECRET

},

mail :
{

    auth : 
    {
        user: process.env.MAIL_USER,
        pass : process.env.MAIL_PASS
    },
    port : process.env.MAIL_PORT,
    host : process.env.MAIL_HOST
},

s3: {
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    bucketName: process.env.S3_BUCKET_NAME,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    expiresIn: parseInt(process.env.S3_EXPIRES_IN as string) || 1800,
  },

COD_FEES : process.env.COD_FEES,

kashier: {

    apiKey: process.env.KASHIER_API_KEY,
    secretKey : process.env.KASHIER_SECRET_KEY


}




})