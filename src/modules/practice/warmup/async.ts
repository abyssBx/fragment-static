import { pget, ppost } from "utils/request";

export function loadKnowledgeIntro(knowledgeId) {
  return pget(`/plan/knowledge/load/${knowledgeId}`)
}

export function loadWarmUpPractice(series, sequence) {
  return pget(`/practice/warmup/start/${series}/${sequence}`)
}

export function answer(params) {
  return ppost(`/practice/warmup/answer`, params)
}
