import * as React from "react";
import { connect } from "react-redux";
import "./ProblemReport.less";
import { loadProblem, createPlan } from "./async";
import { startLoad, endLoad, alertMsg } from "redux/actions";

@connect(state => state)
export class ProblemReport extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {}
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadProblem(this.props.location.query.id).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200)  this.setState(msg)
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onSubmit() {
    const { dispatch } = this.props
    dispatch(startLoad())
    createPlan(this.props.location.query.id).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200)  this.context.router.push({ pathname: '/rise/static/plan/intro', query: { id: msg } })
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  render() {
    const { problem, pic, description } = this.state

    return (
      <div>
        <div className="container has-footer">
          <div className="problem-report">
            <div className="context">
              <div className="context-img">
                <img src={pic} alt=""/>
              </div>
              <div className="context" dangerouslySetInnerHTML={{__html: description}}></div>
            </div>
          </div>
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>下一步</div>
      </div>
    )
  }
}
