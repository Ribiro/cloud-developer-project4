import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { getTodos } from '../../data_access/getTodos'


export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return getTodos(event);
  })

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
