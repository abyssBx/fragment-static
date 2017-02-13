import { pget, ppost } from "utils/request";

export function loadKnowledgeIntro(knowledgeId) {
  return pget(`/rise/plan/knowledge/load/${knowledgeId}`)
}

export function learnKnowledge(knowledgeId) {
  return ppost(`/rise/plan/knowledge/learn/${knowledgeId}`)
}

export function loadWarmUpPractice(practicePlanId) {
  return pget(`/rise/practice/warmup/start/${practicePlanId}`)
}

export function loadWarmUpAnalysis(practicePlanId) {
  return pget(`/rise/practice/warmup/analysis/${practicePlanId}`)
}

export function loadWarmUpNext(id) {
  return pget(`/rise/practice/next/${id}`)
}

export function answer(params, practicePlanId) {
  return ppost(`/rise/practice/warmup/answer/${practicePlanId}`, params)
}

export function discuss(params) {
  return ppost(`/rise/practice/discuss`, params)
}

export function loadWarmUpDiscuss(id, offset) {
  return pget(`/rise/practice/load/discuss/${id}/${offset}`)
}
