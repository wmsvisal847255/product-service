const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME;

exports.handler = async(event) => {
    let productCode = event.pathParameters.productCode;
    let data= await dynamodb.get({
        TableName: tableName,
        Key: {
            productCode: productCode
        }

    }).promise();
    if(data.Item){
        return {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        }
    } else{
        return {
            statusCode: 404,
            body: JSON.stringify({message: "Product not found."})
        }
    }    
}
