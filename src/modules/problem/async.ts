import { pget, ppost } from "utils/request";

export function loadProblemList() {
  return pget(`/fragment/problem/load`)
}

export function submitProblemList(params) {
  return ppost(`/fragment/problem/select`, params)
}

export function loadMyProblemList() {
  return pget(`/fragment/problem/load/mine`)
}

export function loadProblem(id) {
  return pget(`/fragment/problem/get/${id}`)
}

export function createPlan(problemId) {
  return ppost(`/fragment/plan/choose/problem/${problemId}`)
}
