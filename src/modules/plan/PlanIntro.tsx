import * as React from "react";
import { connect } from "react-redux";
import "./PlanIntro.less";
import { loadPlanIntro } from "./async";
import { startLoad, endLoad, alertMsg } from "../../redux/actions";

@connect(state => state)
export class PlanIntro extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      length: '',
      endDate: '',
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    dispatch(startLoad())
    loadPlanIntro(location.query.id).then(res => {
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
    this.context.router.push({ pathname: '/fragment/plan/main' })
  }

  render() {
    const { length, endDate } = this.state

    return (
      <div className="plan-intro">
        <div className="container has-footer">
          <h4>在接下来{length}天里, 每天你需要完成:</h4>
          <div className="sub-info"><span className="number">2</span>个知识点的热身训练</div>
          <div className="sub-info"><span className="number">1</span>个知识点的应用训练</div>
          <div className="info">
            <p>欢迎语和介绍语</p>
            <p>工作和生活中</p>
            <p>你有那些想要提高的方面呢? (可多选)</p>
          </div>
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>开始</div>
      </div>
    )
  }
}