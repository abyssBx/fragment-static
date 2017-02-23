import * as React from "react";
import { connect } from "react-redux";
import "./PlanMain.less";
import { loadPlan, loadPlanHistory, loadWarmUpNext, completePlan, closePlan,updateOpenRise } from "./async";
import { startLoad, endLoad, alertMsg } from "redux/actions";
import AssetImg from "../../components/AssetImg";
import Tutorial from "../../components/Tutorial"
import {merge,isBoolean} from "lodash"

const typeMap = {
  1: '热身训练',
  2: '热身训练',
  11: '应用训练',
  21: '专题训练'
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
      showCompleteModal: false,
      showConfirmModal: false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location.query.series !== newProps.location.query.series && newProps.location.query.series !== undefined) {
      this.componentWillMount(newProps.location.query.series)
    }
  }

  componentWillMount(id) {
    const { dispatch, location } = this.props
    dispatch(startLoad())
    if (id !== undefined || location.query.series !== undefined) {
      loadPlanHistory(id || location.query.series).then(res => {
        dispatch(endLoad())
        const { code, msg } = res
        if (code === 200) {
          if (msg !== null) {
            this.setState({ planData: msg })
            // if (msg.summary) {
            //   dispatch(alertMsg(<div>
            //     <p>很好！你已完成这组训练。</p>
            //     <p>对实践应用或解决问题有心得？及时记录在挑战任务中。</p>
            //   </div>))
            // }
          } else {
            this.context.router.push({ pathname: location.pathname })
            dispatch(alertMsg("下一组任务明早6点解锁"))
          }
        } else if (code === 211) {
          this.context.router.push({ pathname: location.pathname })
          dispatch(alertMsg("下一组任务明早6点解锁"))
        } else if (code === 212) {
          this.context.router.push({ pathname: location.pathname })
          dispatch(alertMsg("先完成这一组的必修任务吧"))
        }
        else dispatch(alertMsg(msg))
      }).catch(ex => {
        dispatch(endLoad())
        dispatch(alertMsg(ex))
      })
    } else {
      loadPlan().then(res => {
        dispatch(endLoad())
        const { code, msg } = res
        if (code === 200) {
          if (msg !== null) {
            this.setState({ planData: msg })
            // if (msg.summary) {
            //   dispatch(alertMsg(<div>
            //     <p>很好！你已完成这组训练。</p>
            //     <p>对实践应用或解决问题有心得？及时记录在挑战任务中。</p>
            //   </div>))
            // }
          } else {
            this.context.router.push({
              pathname: '/rise/static/problem/priority'
            })
          }
        }
        else dispatch(alertMsg(msg))
      }).catch(ex => {
        dispatch(endLoad())
        dispatch(alertMsg(ex))
      })
    }
  }

  onPracticeSelected(item) {
    const { dispatch } = this.props
    const { planData } = this.state
    const { series } = planData
    const { type, practicePlanId, knowledge, unlocked } = item
    if (!unlocked) {
      dispatch(alertMsg("该训练尚未解锁"))
      return
    }
    // 已完成
    if (type === 1 || type === 2) {
      if (item.status === 1) {
        this.context.router.push({
          pathname: '/rise/static/practice/warmup/analysis',
          query: { practicePlanId, id: knowledge.id, series }
        })
      } else {
        if (!knowledge.appear) {
          this.context.router.push({
            pathname: '/rise/static/practice/warmup/intro',
            query: { practicePlanId, id: knowledge.id, series }
          })
        } else {
          this.context.router.push({
            pathname: '/rise/static/practice/warmup/ready',
            query: { practicePlanId, id: knowledge.id, series }
          })
        }
      }
    } else if (type === 11) {
      this.context.router.push({
        pathname: '/rise/static/practice/application',
        query: { id: item.practiceIdList[0], kid: knowledge.id, series, practicePlanId }
      })
    } else if (type === 21) {
      this.context.router.push({
        pathname: '/rise/static/practice/challenge',
        query: { id: item.practiceIdList[0], series, practicePlanId }
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

  prev() {
    const { dispatch } = this.props
    const { planData } = this.state
    const { series } = planData
    if (series === 1) {
      dispatch(alertMsg("当前已经是第一组训练"))
      return
    }
    this.context.router.push({ pathname: this.props.location.pathname, query: { series: series - 1 } })
  }

  next() {
    const { planData } = this.state
    const { series, totalSeries } = planData
    if (series === totalSeries) {

    } else {
      this.context.router.push({ pathname: this.props.location.pathname, query: { series: series + 1 } })
    }
  }

  complete() {
    const { dispatch } = this.props
    dispatch(startLoad())
    completePlan().then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200) {
        if(msg === true)
        {
          this.setState({showCompleteModal: true})
        }else{
          dispatch(alertMsg('请先完成今日的必做训练'))
        }
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  confirm() {
    this.setState({ showCompleteModal: false, showConfirmModal: true })
  }

  closeCompleteModal() {
    this.setState({ showCompleteModal: false })
  }

  closeConfirmModal() {
    this.setState({ showConfirmModal: false })
  }

  problemReview(problemId){
    this.context.router.push({ pathname: '/rise/static/problem/report', query: { id: problemId } })
  }

  nextPlan() {
    const { dispatch } = this.props
    dispatch(startLoad())
    closePlan().then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200) {
        this.context.router.push("/rise/static/problem/priority")
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  tutorialEnd(){
    const {dispatch} = this.props;
    const {planData} = this.state;
    dispatch(startLoad());
    updateOpenRise().then(res => {
      dispatch(endLoad());
      const {code,msg} = res;
      if(code === 200){
        this.setState({planData:merge({},planData,{openRise:true})});
      } else {
        dispatch(alertMsg(msg));
      }
    })
  }

  render() {
    const { planData, showCompleteModal, showConfirmModal } = this.state
    const {
      problem = {}, practice, warmupComplete, applicationComplete, point, total,
      deadline, status, currentSeries, totalSeries, series,openRise
    } = planData

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
              {item.status === 0 ? <AssetImg type="go4" width={27} height={17} marginTop={(75-17)/2}/> : null}
              {item.status === 2 ? <AssetImg type="improve" width={42} height={17} marginTop={(75-17)/2}/> : null}
              {item.status === 3 ? <AssetImg type="alter" width={32} height={17} marginTop={(75-17)/2}/> : null}
            </div>
          </div>
        )
      })
    }

    return (
      <div>
        { showCompleteModal ?
          <div className="mask">
            <div className="finished_modal">
              <AssetImg width={290} height={410} url="http://www.iquanwai.com/images/fragment/finish_modal2.png"/>
              <div className="modal_context">
                <div className="content">
                  <div className="text2">太棒了!</div>
                  <div className="text">你完成了本专题全部必做训练</div>
                </div>
                <div className="content2">
                  已得<span className="number">{point}</span>积分
                </div>
                {/**<div className="button">分享一下</div>**/}
                <div className="modal-button-footer complete">
                  <div className="left" onClick={this.confirm.bind(this)}>
                    下一专题
                  </div>
                  <div className="right" onClick={this.closeCompleteModal.bind(this)}>取消
                  </div>
                </div>
              </div>
            </div>
          </div>
          : null }
        { showConfirmModal ?
          <div className="mask">
            <div className="finished_modal">
              <AssetImg width={290} height={410} url="http://www.iquanwai.com/images/fragment/finish_modal2.png"/>
              <div className="modal_context">
                <div className="content">
                  <div className="text">确定开始新专题吗</div>
                  <div className="text">当前专题的热身训练将无法查看</div>
                </div>
                <div className="content2">
                  <div className="text">（PC端应用训练仍然开放）</div>
                </div>
                {/**<div className="button">分享一下</div>**/}
                <div className="modal-button-footer confirm">
                  <div className="left" onClick={this.nextPlan.bind(this)}>
                    确定
                  </div>
                  <div className="right" onClick={this.closeConfirmModal.bind(this)}>取消</div>
                </div>
              </div>
            </div>
          </div>
          : null }
        { isBoolean(openRise) && !openRise?
          <div className="mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.8)',position:'fixed'}}>
            <Tutorial onShowEnd={()=>this.tutorialEnd()}/>
          </div>
          :null}
        { status === 3 ?
          <div className="mask">
            <div className="finished_modal">
              <AssetImg width={290} height={410} url="http://www.iquanwai.com/images/fragment/expire_modal2.png"/>
              <div className="modal_context">
                <div className="content"><div className="text">本专题已到期</div></div>
                <div className="content2">
                  <div className="text">登录</div>
                  <div className="text">www.iquanwai.com/community</div>
                  <div className="text">可继续完成专题/应用训练</div>
                </div>
                {/**<div className="button">分享一下</div>**/}
                <div className="modal-button-footer complete">
                  <div className="button" onClick={this.nextPlan.bind(this)}>开始新专题
                  </div>
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
              <label>进行中:</label> {series}/{totalSeries}组训练
            </div>
            <div className="section">
              <label>距关闭:</label> {deadline}天
            </div>
            <div className="section">
              <label>总得分:</label> {point} 分
            </div>
          </div>
          <div className="problem-review" onClick={() => this.problemReview(problem.id)}>
            专题详情
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
        {/**<div className="button-footer" onClick={this.nextTask.bind(this)}>开始</div>**/}
        <div className="button-footer">
          <div className={`left origin ${series === 1 ? ' disabled' : ''}`} onClick={this.prev.bind(this)}>上一组
          </div>
          { series !== totalSeries ? <div className={`right`} onClick={this.next.bind(this)}>下一组</div> : null }
          { series === totalSeries ? <div className={`right`} onClick={this.complete.bind(this)}>
            完成训练</div> : null }
        </div>
      </div>
    )
  }
}
