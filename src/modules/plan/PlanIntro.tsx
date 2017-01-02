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
      pic: ''
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
    const { length, endDate, pic } = this.state

    return (
      <div>
        <div className="container has-footer">
          <div className="plan-intro">
            <div className="info-title">在接下来{length}天里, 每天你需要完成:</div>
            <div className="sub-info"><span className="number">2</span>个知识点的热身训练</div>
            <div className="sub-info"><span className="number">1</span>个知识点的应用训练</div>
            <div className="sub-info"><span className="number">1</span>个综合的挑战训练</div>
            <div className="context-img">
              <img src={pic} alt=""/>
            </div>
            <div className="info">
              <p>每天6点会解锁你新一天的训练任务, 选择你一天中最方便的时间训练, 并形成习惯。</p>
            </div>
            <div className="info">
              <p>{endDate}训练到期后会关闭。请坚持每天来提升自己, 加油!</p>
            </div>
          </div>
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>开始</div>
      </div>
    )
  }
}