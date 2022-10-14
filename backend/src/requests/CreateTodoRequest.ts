/**
 * Fields in a request to create a single TODO item.
 */
export interface CreateTodoRequest {
  name: string
  dueDate: string,
  refKey?: string,
  userId: String
}
