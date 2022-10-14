import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";
import { createLogger } from "../utils/logger";
import { enableTracing } from "../utils/tracing";

const logger = createLogger('TodosAccess')

export const updateTodo = async (todo: UpdateTodoRequest, todoId: string, attachmentUrl: string) => {
    logger.info("updating todo")
    const dynamoDB = new enableTracing.DynamoDB.DocumentClient()

    const { name, done } = todo;
    const updatedAttributes = [];
    const expressionAttributeValues = {};

    if (name) {
        updatedAttributes.push(`name = :name`);
        expressionAttributeValues[':name'] = name;
    }
    if (attachmentUrl) {
        updatedAttributes.push(`attachmentUrl = :attachmentUrl`);
        expressionAttributeValues[':attachmentUrl'] = attachmentUrl;
    }

    if (done !== undefined) {
        updatedAttributes.push(`done = :done`);
        expressionAttributeValues[':done'] = !!done;
    }


    const updateExpression = `set ${updatedAttributes.join(', ')}`;
    const params = {
        TableName: 'Todos-dev',
        Key: { "todoId": todoId, 'refKey': 'todos' },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues
        // ReturnValues: 'ALL_NEW',
    };

    let updatedTodo;

    try {
        const result = await dynamoDB.update(params).promise();
        updatedTodo = result.Attributes;
    } catch (error) {
        return {
            statusCode: 200,
            body: JSON.stringify(error),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(updatedTodo),
    };
}