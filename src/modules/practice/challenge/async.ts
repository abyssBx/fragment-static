import { pget } from "utils/request";

export function loadKnowledgeIntro(knowledgeId) {
  return pget(`/rise/plan/knowledge/load/${knowledgeId}`)
}

export function loadChallengePractice(id) {
  return pget(`/rise/practice/challenge/start/${id}`)
}

export function loadWarmUpNext(id) {
  return pget(`/rise/practice/next/${id}`)
}
