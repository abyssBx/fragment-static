import { pget, ppost } from "utils/request";

export function loadKnowledgeIntro(knowledgeId) {
  return pget(`/fragment/plan/knowledge/load/${knowledgeId}`)
}

export function learnKnowledge(knowledgeId) {
  return ppost(`/fragment/plan/knowledge/learn/${knowledgeId}`)
}

export function loadWarmUpPractice(practicePlanId) {
  return pget(`/fragment/practice/warmup/start/${practicePlanId}`)
}

export function loadWarmUpAnalysis(practicePlanId) {
  return pget(`/fragment/practice/warmup/analysis/${practicePlanId}`)
}

export function loadWarmUpNext(id) {
  return pget(`/fragment/practice/next/${id}`)
}

export function answer(params, practicePlanId) {
  return ppost(`/fragment/practice/warmup/answer/${practicePlanId}`, params)
}

export function discuss(params) {
  return ppost(`/fragment/practice/discuss`, params)
}

export function loadWarmUpDiscuss(id, offset) {
  return pget(`/fragment/practice/load/discuss/${id}/${offset}`)
}
