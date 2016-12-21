import { pget } from "utils/request";

export function loadPlan() {
  return pget(`/plan/load`)
}

export function loadPlanIntro(planId) {
  return pget(`/plan/play/${planId}`)
}

export function submitProblemList(params) {
  return ppost(`/problem/select`, params)
}
