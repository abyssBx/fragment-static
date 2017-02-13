import { pget } from "utils/request";

export function loadKnowledgeIntro(knowledgeId) {
  return pget(`/fragment/plan/knowledge/load/${knowledgeId}`)
}

export function loadApplicationPractice(id) {
  return pget(`/fragment/practice/application/start/${id}`)
}

export function loadWarmUpNext(id) {
  return pget(`/fragment/practice/next/${id}`)
}
