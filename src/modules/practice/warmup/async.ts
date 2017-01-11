import { pget, ppost } from "utils/request";

export function loadKnowledgeIntro(knowledgeId) {
  return pget(`/plan/knowledge/load/${knowledgeId}`)
}

export function learnKnowledge(knowledgeId) {
  return ppost(`/plan/knowledge/learn/${knowledgeId}`)
}

export function loadWarmUpPractice(practicePlanId) {
  return pget(`/practice/warmup/start/${practicePlanId}`)
}

export function loadWarmUpAnalysis(practicePlanId) {
  return pget(`/practice/warmup/analysis/${practicePlanId}`)
}

export function loadWarmUpNext(id) {
  return pget(`/practice/next/${id}`)
}

export function answer(params, practicePlanId) {
  return ppost(`/practice/warmup/answer/${practicePlanId}`, params)
}
