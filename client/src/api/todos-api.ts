import { apiEndpoint } from '../config'
import { Todo } from '../types/Todo';
import { CreateTodoRequest } from '../types/CreateTodoRequest';
import Axios from 'axios'
import { UpdateTodoRequest } from '../types/UpdateTodoRequest';

export async function getTodos(idToken: string): Promise<Todo[]> {
  console.log('Fetching todos')

  const response = await Axios.get(`${apiEndpoint}/todos`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Todos:', response.data)
  return response.data
}

export async function createTodo(
  idToken: string,
  newTodo: CreateTodoRequest
): Promise<Todo> {
  newTodo.todoId = `${(Math.random() + 1).toString(36).substring(2)}`
  newTodo.userId = `${(Math.random() + 1).toString(36).substring(2)}`
  newTodo.createdAt = newTodo.dueDate
  newTodo.attachmentUrl = ""
  newTodo.done = false
  console.log('about to create todo now..', newTodo)
  const response = await Axios.post(`${apiEndpoint}/todos`, JSON.stringify(newTodo), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }

  })
  console.log("can create item", response.data)
  return response.data
}

export async function patchTodo(
  idToken: string,
  todoId: string,
  updatedTodo: UpdateTodoRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/todos/${todoId}`, JSON.stringify(updatedTodo), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function deleteTodo(
  idToken: string,
  todoId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/todos/${todoId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  todoId: string,
  imageType: string
): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/todos/attachment?id=${todoId}&&type=${imageType}`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  console.log("upload URL:", response.data.url)
  return response.data.url
}

export async function uploadFile(uploadUrl: string, file: Buffer, imageType: string): Promise<void> {

  await Axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': imageType,
    }
  })
}
