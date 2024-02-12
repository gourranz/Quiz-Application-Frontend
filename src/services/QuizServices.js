import Client from './api'

export const GetQuiz = async () => {
  try {
    const res = await Client.get('/quiz')
    return res.data
  } catch (error) {
    throw error
  }
}
