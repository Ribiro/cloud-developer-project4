import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { createTodo } from '../../businessLogic/createTodo'
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return createTodo(event);
  }
).use(httpErrorHandler())
  .use(
    cors({
      credentials: false
    }))
