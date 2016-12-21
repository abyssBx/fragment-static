import * as React from "react";
import { Route } from "react-router";
import Base from "modules/base/Base";
import { ProblemList } from "modules/problem/ProblemList";
import { ProblemPriority } from "modules/problem/ProblemPriority";
import { ProblemReport } from "modules/problem/ProblemReport";
import { PlanIntro } from "modules/plan/PlanIntro";
import { PlanMain } from "modules/plan/PlanMain";
import { Intro as WarmUpIntro } from "modules/practice/warmup/Intro";
import { Main as WarmUp } from "modules/practice/warmup/Main";
import { Result as WarmUpResult } from "modules/practice/warmup/Result";
import { Ready as WarmUpReady } from "modules/practice/warmup/Ready";

const routes = (
  <Route path="/fragment" component={Base}>
    <Route path="problem/list" component={ProblemList}/>
    <Route path="problem/priority" component={ProblemPriority}/>
    <Route path="problem/report" component={ProblemReport}/>
    <Route path="plan/intro" component={PlanIntro}/>
    <Route path="plan/main" component={PlanMain}/>
    <Route path="practice/warmup/intro" component={WarmUpIntro}/>
    <Route path="practice/warmup" component={WarmUp}/>
    <Route path="practice/warmup/result" component={WarmUpResult}/>
    <Route path="practice/warmup/ready" component={WarmUpReady}/>
  </Route>
)

export default routes
