import { pget, ppost } from "utils/request";

export function loadProblemList() {
  return pget(`/rise/problem/load`)
}

export function submitProblemList(params) {
  return ppost(`/rise/problem/select`, params)
}

export function loadMyProblemList() {
  return pget(`/rise/problem/load/mine`)
}

export function loadProblem(id) {
  return pget(`/rise/problem/get/${id}`)
}

export function createPlan(problemId) {
  return ppost(`/rise/plan/choose/problem/${problemId}`)
}
