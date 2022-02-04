const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME;

exports.handler = async(event) => {
    let productCode = event.pathParameters.productCode;
    let {productName, price, quantity} = JSON.parse(event.body);   

    let product = {
        productCode: productCode,
        productName: productName,
        price: price,
        quantity: quantity
    }

    console.error(product);
    console.error(tableName);
    let data = await dynamodb.put({
        TableName: tableName,
        Item: product
    }).promise();
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Data inserted/updated successfully.'
        })
    }
}
