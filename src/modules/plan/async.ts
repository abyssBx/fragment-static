import { pget, ppost } from "utils/request";

export function loadPlan() {
  return pget(`/rise/plan/load`)
}

export function loadPlanHistory(series) {
  return pget(`/rise/plan/history/load/${series}`)
}

export function loadPlanIntro(planId) {
  return pget(`/rise/plan/play/${planId}`)
}

export function submitProblemList(params) {
  return ppost(`/rise/problem/select`, params)
}

export function loadWarmUpNext(id) {
  return pget(`/rise/practice/next/${id}`)
}

export function completePlan() {
  return ppost(`/rise/plan/complete`)
}

export function closePlan() {
  return ppost(`/rise/plan/close`)
}

export function updateOpenRise(){
  return ppost(`/rise/plan/openrise`)
}
