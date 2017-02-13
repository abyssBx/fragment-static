import { pget } from "utils/request";

export function loadKnowledgeIntro(knowledgeId) {
  return pget(`/fragment/plan/knowledge/load/${knowledgeId}`)
}

export function loadChallengePractice(id) {
  return pget(`/fragment/practice/challenge/start/${id}`)
}

export function loadWarmUpNext(id) {
  return pget(`/fragment/practice/next/${id}`)
}
