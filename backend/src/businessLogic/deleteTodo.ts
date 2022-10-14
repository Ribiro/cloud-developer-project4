import { createLogger } from "../utils/logger";
import { enableTracing } from "../utils/tracing";

const logger = createLogger('TodosAccess')

export const deleteTodo = async (todoId: string) => {
    logger.info("deleting todo")
    const dynamoDB = new enableTracing.DynamoDB.DocumentClient()

    const params = {
        TableName: 'Todos-dev',
        Key: { 'todoId': todoId, 'refKey': 'todos' },
    };

    try {
        await dynamoDB.delete(params).promise();
    } catch (error) {
        console.error(error);
        return {
            statusCode: 222,
            body: JSON.stringify(error),
        }
    }


    return {
        statusCode: 200,
        body: JSON.stringify({ "deleted": true }),
    }
}
