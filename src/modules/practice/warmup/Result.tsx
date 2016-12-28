import * as React from "react";
import { connect } from "react-redux";
import "./Result.less";
import { loadKnowledgeIntro, loadWarmUpNext } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";

@connect(state => state)
export class Result extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {}
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    dispatch(startLoad())
    loadKnowledgeIntro(location.query.id).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200)  this.setState({ data: msg })
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onSubmit() {
    this.context.router.push({ pathname: '/fragment/practice/warmup/analysis', query: this.props.location.query })
  }

  nextTask() {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadWarmUpNext().then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200) {
        const item = msg
        const { type, series, sequence, knowledge, unlocked } = item
        if (!unlocked) {
          dispatch(alertMsg("该训练尚未解锁"))
          return
        }
        if (type === 1 || type === 2) {
          if (item.status === 1) {
            this.context.router.push({
              pathname: '/fragment/practice/warmup/analysis',
              query: { series, sequence, id: knowledge.id }
            })
          } else {
            if (!knowledge.appear) {
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
        } else if (type === 11) {
          this.context.router.push({
            pathname: '/fragment/practice/application',
            query: { appId: item.practiceIdList[0], id: knowledge.id }
          })
        } else if (type === 21) {
          this.context.router.push({
            pathname: '/fragment/practice/challenge',
            query: { id: item.practiceIdList[0] }
          })
        }
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  render() {
    const { rightNumber, point } = this.props.location.query
    const { data } = this.state
    const { knowledge, voice, pic, analysis } = data

    return (
      <div>
        <div className="container has-footer">
          <div className="warm-up-result">
            <div className="page-header">{knowledge}</div>
            <div className="intro-container">
              <div className="context-img">
                <img src="http://www.iquanwai.com/images/cintro1.png" alt=""/>
              </div>
              <div className="section">
                <div className="section-title">答对题数</div>
                <div className="count-circle">
                  <span className="count-main">{rightNumber}</span><span className="count-sub">/ 3</span>
                </div>
              </div>
              <div className="section">
                <div className="section-title">任务得分</div>
                <div className="count">
                  <span className="count-main">{point}</span><span className="count-sub">分</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="button-footer">
          <div className="left" onClick={this.onSubmit.bind(this)}>知识回顾</div>
          <div className="right" onClick={this.nextTask.bind(this)}>下一任务</div>
        </div>
      </div>
    )
  }
}