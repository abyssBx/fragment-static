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
import { Analysis as WarmUpAnalysis } from "modules/practice/warmup/Analysis";
import { Result as WarmUpResult } from "modules/practice/warmup/Result";
import { Ready as WarmUpReady } from "modules/practice/warmup/Ready";
import { Main as Application } from "modules/practice/application/Main";
import { Main as Challenge } from "modules/practice/challenge/Main";
import { Submit as ApplicationPracticeSubmit } from "modules/practice/application/Submit";
import { Submit as ChallengePracticeSubmit } from "modules/practice/challenge/Submit";

const routes = (
  <Route path="/rise/static" component={Base}>
    <Route path="problem/list" component={ProblemList}/>
    <Route path="problem/priority" component={ProblemPriority}/>
    <Route path="problem/report" component={ProblemReport}/>
    <Route path="plan/intro" component={PlanIntro}/>
    <Route path="plan/main" component={PlanMain}/>
    <Route path="practice/warmup/intro" component={WarmUpIntro}/>
    <Route path="practice/warmup" component={WarmUp}/>
    <Route path="practice/warmup/analysis" component={WarmUpAnalysis}/>
    <Route path="practice/warmup/result" component={WarmUpResult}/>
    <Route path="practice/warmup/ready" component={WarmUpReady}/>
    <Route path="practice/application" component={Application}/>
    <Route path="practice/challenge" component={Challenge}/>
    <Route path="practice/application/submit" component={ApplicationPracticeSubmit}/>
    <Route path="practice/challenge/submit" component={ChallengePracticeSubmit}/>
  </Route>
)

export default routes
