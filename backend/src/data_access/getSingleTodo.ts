import { createLogger } from "../utils/logger";
import { enableTracing } from "../utils/tracing";

const logger = createLogger('TodosAccess')


export const getSingleTodo = async (todoId: string) => {
    const dynamoDB = new enableTracing.DynamoDB.DocumentClient()
    logger.info("get single todo")
    const result = await dynamoDB
        .query({
            TableName: 'Todos-dev',
            ExpressionAttributeValues: {
                ':todoId': todoId,
                ':refKey': 'todos'
            },
            KeyConditionExpression: 'todoId = :todoId and refKey = :refKey',
            ProjectionExpression: 'todoId, createdAt,userId,done,todoName,dueDate,attachmentUrl',
        })
        .promise();
    return result.Items[0];
}