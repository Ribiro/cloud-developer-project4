import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { getUserId } from "../lambda/utils";
import { createLogger } from "../utils/logger";
import { enableTracing } from "../utils/tracing";

const logger = createLogger('TodosAccess')



export const getTodos = async (event) => {
    logger.info("getting all todos")
    const dynamoDB = new enableTracing.DynamoDB.DocumentClient()

    let todos: DocumentClient.ItemList;
    let userId: string = getUserId(event)
    try {
        const result = await dynamoDB
            .query({
                TableName: 'Todos-dev',
                ExpressionAttributeValues: {
                    ':refKey': 'todos',
                },
                KeyConditionExpression: 'refKey = :refKey',
                ProjectionExpression: 'todoId, createdAt,userId,done,todoName,dueDate,attachmentUrl',
            })
            .promise();
        todos = result.Items.filter((e) => e.userId == userId);
    } catch (error) {
        return {
            statusCode: 222,
            body: JSON.stringify({ error }),
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify(todos),
    };
}