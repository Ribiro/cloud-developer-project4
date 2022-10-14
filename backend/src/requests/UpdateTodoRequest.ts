/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdateTodoRequest {
  name: string
  dueDate: string
  done: boolean,
  todoId: string,
  attachmentUrl?: string
}