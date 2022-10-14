export interface CreateTodoRequest {
  todoName: string
  dueDate: string,
  todoId?: string,
  userId?: string,
  createdAt?: string,
  done?: boolean,
  attachmentUrl?: string
}
