import * as React from "react";
import { connect } from "react-redux";
import "./PlanMain.less";
import { loadPlan, loadWarmUpNext } from "./async";
import { startLoad, endLoad, alertMsg } from "redux/actions";
import AssetImg from "../../components/AssetImg";

const typeMap = {
  1: '热身训练',
  2: '热身训练',
  11: '应用训练',
  21: '挑战训练'
}

@connect(state => state)
export class PlanMain extends React.Component <any, any> {
  constructor() {
    super()
    this.picWidth = window.innerWidth
    this.picHeight = window.innerWidth / (750 / 350)
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
      if (code === 200) {
        if (msg !== null) {
          this.setState({ planData: msg })
        } else {
          this.context.router.push({
            pathname: '/fragment/problem/priority'
          })
        }
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onPracticeSelected(item) {
    const { dispatch } = this.props
    const { type, series, sequence, knowledge, unlocked } = item
    if (!unlocked) {
      dispatch(alertMsg("该训练尚未解锁"))
      return
    }
    // 已完成
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
  }

  nextTask() {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadWarmUpNext().then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200) {
        this.onPracticeSelected(msg)
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  render() {
    const { planData } = this.state
    const { problem = {}, practice, complete, point, total, deadline, status, currentSeries, totalSeries } = planData

    const practiceRender = (list = []) => {
      return list.map((item, index) => {
        return (
          <div key={index} className="practice-card"
               onClick={() => this.onPracticeSelected(item)}>
            <div className="header">
              {item.type === 1 || item.type === 2 ? <AssetImg type="warmup" size={50}/> : null }
              {item.type === 11 ? <AssetImg type="application" size={50}/> : null }
              {item.type === 21 ? <AssetImg type="challenge" size={50}/> : null }
            </div>
            <div className="body">
              <div className="title">{typeMap[item.type]}</div>
              <div className="sub-title">{item.knowledge ? item.knowledge.knowledge : ''}</div>
            </div>
            <div className="footer">
              {item.status === 1 ? <AssetImg type="finished" width={32} height={28} marginTop={(75-28)/2}/> : null}
              {item.status === 0 ? <AssetImg type="go1" width={27} height={17} marginTop={(75-17)/2}/> : null}
            </div>
          </div>
        )
      })
    }

    return (
      <div>
        { status === 2 ?
          <div className="mask">
            <div className="finished_modal">
              <AssetImg width={290} height={410} url="http://www.iquanwai.com/images/fragment/finish_modal.png"/>
              <div className="modal_context">
                <div className="title">
                  你的"{problem.problem}"已经完成了! <br/>
                  这个过程中, 你共完成了:
                </div>
                <div className="content">
                  <span className="number">{complete}</span><span className="text">个热身训练</span>
                </div>
                <div className="sub-title">获得了</div>
                <div className="content2">
                  <span className="number">{point}</span><span className="text">积分</span>
                </div>
                <div className="button">分享一下</div>
                <div className="button" onClick={() => this.context.router.push("/fragment/problem/priority")}>再来一个
                </div>
              </div>
            </div>
            <div className="ended_modal">

            </div>
          </div>
          : null }
        { status === 3 ?
          <div className="mask">
            <div className="finished_modal">
              <AssetImg width={290} height={410} url="http://www.iquanwai.com/images/fragment/expire_modal.png"/>
              <div className="modal_context">
                <div className="title">
                  你的"{problem.problem}"已经到期了! <br/>
                  这个过程中, 你共完成了:
                </div>
                <div className="content">
                  <span className="number">{complete}</span><span className="text">个热身训练</span>
                </div>
                <div className="sub-title">获得了</div>
                <div className="content2">
                  <span className="number">{point}</span><span className="text">积分</span>
                </div>
                <div className="button">分享一下</div>
                <div className="button" onClick={() => this.context.router.push("/fragment/problem/priority")}>再来一个
                </div>
              </div>
            </div>
          </div>
          : null }
        <div className="header-img">
          <img src={problem.pic} style={{width: this.picWidth, height: this.picHeight}}/>
          <div className="plan-guide">
            <div className="section-title">{problem.problem}</div>
            <div className="section">
              进度: {currentSeries}/{totalSeries}
            </div>
            <div className="section">
              开放: {deadline}天
            </div>
            <div className="section">
              得分: {point} 分
            </div>
          </div>
        </div>
        <div className="container has-footer"
             style={{height: window.innerHeight - this.picHeight - 49, backgroundColor: '#f9f6f6'}}>
          <div className="plan-main">
            <div className="list">
              {practiceRender(practice)}
            </div>
          </div>
        </div>
        <div className="button-footer" onClick={this.nextTask.bind(this)}>开始</div>
      </div>
    )
  }
}