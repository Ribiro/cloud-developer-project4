import { APIGatewayProxyEvent } from "aws-lambda";
import { getUserId } from "../lambda/utils";
import { CreateTodoRequest } from "../requests/CreateTodoRequest";
import { createLogger } from "../utils/logger";
import { enableTracing } from "../utils/tracing";
const logger = createLogger('TodosAccess')

export const createTodo = async (event: APIGatewayProxyEvent) => {
    logger.info('creating todo')
    const dynamoDB = new enableTracing.DynamoDB.DocumentClient()

    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    newTodo.refKey = "todos";
    newTodo.userId = getUserId(event)
    try {
        await dynamoDB
            .put({
                TableName: 'Todos-dev',
                Item: newTodo,
            })
            .promise();
    } catch (error) {
        return {
            statusCode: 222,
            body: JSON.stringify({ error }),
        };
    }
    return {
        statusCode: 201,
        body: JSON.stringify(newTodo),
    };
}