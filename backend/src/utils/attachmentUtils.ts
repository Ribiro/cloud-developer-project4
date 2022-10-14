import * as AWS from "aws-sdk";
import { getSingleTodo } from "../data_access/getSingleTodo";
import { updateTodo } from "../businessLogic/updateTodo";
import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";
import { createLogger } from "./logger";
import { generateUrl } from "./urlGenerator";
const logger = createLogger('TodosAccess')

export const generateAttachemnt = async (id: string, imageType: string) => {
    logger.info("generating attachement")
    var { item, fileUrl, url }: { item: AWS.DynamoDB.DocumentClient.AttributeMap; fileUrl: string; url: string; } = await generateUrl(id, imageType);
    await updateTodo(item as UpdateTodoRequest, id, fileUrl)
    let itemu = await getSingleTodo(id)
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                url,
                itemu
            },
            null,
            2
        ),
    };
}


