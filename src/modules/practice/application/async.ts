import { pget, ppost } from "utils/request";

export function loadKnowledgeIntro(knowledgeId) {
  return pget(`/rise/plan/knowledge/load/${knowledgeId}`)
}

export function loadApplicationPractice(id) {
  return pget(`/rise/practice/application/start/${id}`)
}

export function loadWarmUpNext(id) {
  return pget(`/rise/practice/next/${id}`)
}

export function submitApplicationPractice(submitId, params) {
  return ppost(`/rise/practice/application/submit/${submitId}`, params)
}
