import * as React from "react";
import { connect } from "react-redux";
import "./PlanMain.less";
import { loadPlan } from "./async";
import { startLoad, endLoad, alertMsg } from "redux/actions";

const typeMap = {
  1: '热身训练',
  2: '应用训练',
  3: '挑战训练'
}

@connect(state => state)
export class PlanMain extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      planData: {},
      knowledge: {},
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    dispatch(startLoad())
    loadPlan().then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200)  this.setState({ planData: msg })
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onPracticeSelected(item) {
    const { series, sequence, knowledge } = item
    if (knowledge.appear === 0) {
      this.context.router.push({
        pathname: '/fragment/practice/warmup/intro',
        query: { series, sequence, id: knowledge.id }
      })
    } else {
      this.context.router.push({
        pathname: '/fragment/practice/warmup/ready',
        query: { series, sequence, id: knowledge.id }
      })
    }
  }

  onSubmit() {
    this.context.router.push({ pathname: '/fragment/plan/main' })
  }

  render() {
    const { planData } = this.state
    const { problem, practice } = planData

    const practiceRender = (list = []) => {
      return list.map((item, index) => {
        return (
          <div key={index} className="practice-card"
               onClick={() => this.onPracticeSelected(item)}>
            <div className="header">
            </div>
            <div className="body">
              <div className="title">{typeMap[item.type]}</div>
              <div className="sub-title">{item.knowledge.knowledge}</div>
            </div>
            <div className="footer">

            </div>
          </div>
        )
      })
    }

    return (
      <div className="plan-main">
        <div className="container has-footer">
          {practiceRender(practice)}
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>开始</div>
      </div>
    )
  }
}