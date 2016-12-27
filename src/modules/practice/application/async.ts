import { pget } from "utils/request";

export function loadKnowledgeIntro(knowledgeId) {
  return pget(`/plan/knowledge/load/${knowledgeId}`)
}

export function loadApplicationPractice(id) {
  return pget(`/practice/application/start/${id}`)
}

export function loadWarmUpNext() {
  return pget(`/practice/next`)
}