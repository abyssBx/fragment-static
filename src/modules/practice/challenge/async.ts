import { pget } from "utils/request";

export function loadKnowledgeIntro(knowledgeId) {
  return pget(`/plan/knowledge/load/${knowledgeId}`)
}

export function loadChallengePractice(id) {
  return pget(`/practice/challenge/start/${id}`)
}

export function loadWarmUpNext() {
  return pget(`/practice/next`)
}