import { pget, ppost } from "utils/request";

export function loadPlan() {
  return pget(`/fragment/plan/load`)
}

export function loadPlanHistory(series) {
  return pget(`/fragment/plan/history/load/${series}`)
}

export function loadPlanIntro(planId) {
  return pget(`/fragment/plan/play/${planId}`)
}

export function submitProblemList(params) {
  return ppost(`/fragment/problem/select`, params)
}

export function loadWarmUpNext(id) {
  return pget(`/fragment/practice/next/${id}`)
}

export function completePlan() {
  return ppost(`/fragment/plan/complete`)
}

export function closePlan() {
  return ppost(`/fragment/plan/close`)
}
