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
    this.context.router.push({ pathname: '/rise/static/plan/main' })
  }

  render() {
    const { length, endDate, pic, totalSeries } = this.state

    return (
      <div>
        <div className="container has-footer">
          <div className="plan-intro">
            <div className="text">从了解到运用这些知识，你会训练的任务共有：</div>
            <div className="groups">{totalSeries}组</div>
            <div className="text">你需要每天完成一组（1组含4个训练任务）</div>
            <div className="context-img">
              <img src={"http://www.iquanwai.com/images/fragment/play.png"} alt=""/>
            </div>
            <div className="context">完成后第二天早上6点会解锁下一组</div>
            <div className="text" style={{marginTop: 35}}>你共有{length}天完成所有的训练，截止日期如下：</div>
            <div className="date">{endDate}</div>
            <div className="context">训练到期并自动关闭。完成该专题的训练后，可以继续选择下一个专题训练。</div>
            <div className="text" style={{marginTop: 35}}>点击下方按钮，开始第一天的训练吧</div>
          </div>
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>开始</div>
      </div>
    )
  }
}
