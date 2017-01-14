import { pget, ppost } from "utils/request";

export function loadPlan() {
  return pget(`/plan/load`)
}

export function loadPlanHistory(series) {
  return pget(`/plan/history/load/${series}`)
}

export function loadPlanIntro(planId) {
  return pget(`/plan/play/${planId}`)
}

export function submitProblemList(params) {
  return ppost(`/problem/select`, params)
}

export function loadWarmUpNext(id) {
  return pget(`/practice/next/${id}`)
}

export function completePlan() {
  return ppost(`/plan/complete`)
}

export function closePlan() {
  return ppost(`/plan/close`)
}
