import apiClient from '../utils/apiClient'

export interface User {
  uuid: string
  email: string
  name: string
}

export interface CreateUserDTO {
  email: string
  name: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  currentPage: number
  perPage: number
  totalPages: number
}

export const userRepository = {
  async fetchUsers(currentPage = 1, perPage = 10): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get('/users', {
      params: { currentPage, perPage },
    })
    return {
      data: response.data.users,
      total: response.data.total,
      currentPage: response.data.currentPage,
      perPage: response.data.perPage,
      totalPages: response.data.totalPages,
    }
  },

  async createUser(user: CreateUserDTO): Promise<User> {
    const response = await apiClient.post('/users', {
      email: user.email,
      name: user.name
    })

    return response.data
  },
}
