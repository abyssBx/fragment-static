import { pget, ppost } from "utils/request";

export function loadKnowledgeIntro(knowledgeId) {
  return pget(`/plan/knowledge/load/${knowledgeId}`)
}

export function learnKnowledge(knowledgeId) {
  return ppost(`/plan/knowledge/learn/${knowledgeId}`)
}

export function loadWarmUpPractice(series, sequence) {
  return pget(`/practice/warmup/start/${series}/${sequence}`)
}

export function loadWarmUpAnalysis(series, sequence) {
  return pget(`/practice/warmup/analysis/${series}/${sequence}`)
}

export function loadWarmUpNext() {
  return pget(`/practice/next`)
}

export function answer(params) {
  return ppost(`/practice/warmup/answer`, params)
}
