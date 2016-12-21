import { pget, ppost } from "utils/request";

export function loadProblemList() {
	return pget(`/problem/load`)
}

export function submitProblemList(params) {
	return ppost(`/problem/select`, params)
}

export function loadMyProblemList() {
	return pget(`/problem/load/mine`)
}

export function createPlan(problemId) {
	return ppost(`/plan/choose/problem/${problemId}`)
}