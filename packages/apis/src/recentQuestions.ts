import {
  BodyStringResponse,
  RecentQuestionsRequest,
  RequestRemoveUtterance,
  postRecentQuestionsResponse
} from '../types'
import { daquvApi } from './axiosInstance'

const postRecentQuestions = async ({
  userId
}: RecentQuestionsRequest): Promise<postRecentQuestionsResponse> => {
  const { data } = await daquvApi.post('/sel/recommendQuest', {
    userId: userId
  })
  return data
}

const postRemoveRecentQuestion = async ({
  utterance,
  intentCd,
  utteranceDate,
  userId,
  type
}: RequestRemoveUtterance): Promise<BodyStringResponse> => {
  if (type === 'ALL') {
    const { data } = await daquvApi.post('/upd/recentQuest', {
      user_id: userId,
      type: 'ALL'
    })
    return data
  }
  const { data } = await daquvApi.post('/upd/recentQuest', {
    utteranceDate: utteranceDate,
    user_id: userId,
    intentCd: intentCd,
    utterance: utterance
  })
  return data
}

export { postRecentQuestions, postRemoveRecentQuestion }
