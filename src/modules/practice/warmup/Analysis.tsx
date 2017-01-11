import * as React from "react";
import { connect } from "react-redux";
import { remove, set, merge } from "lodash";
import "./Analysis.less";
import { loadWarmUpAnalysis, loadKnowledgeIntro, loadWarmUpNext } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import Audio from "../../../components/Audio";
import AssetImg from "../../../components/AssetImg";
import KnowledgeViewer from "../components/KnowledgeViewer";

const sequenceMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
}

@connect(state => state)
export class Analysis extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      list: [],
      currentIndex: 0,
      practiceCount: 0,
      knowledge: {},
      showKnowledge: false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    const { practicePlanId } = location.query
    dispatch(startLoad())
    loadKnowledgeIntro(location.query.id).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200)  this.setState({ knowledge: msg })
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
    loadWarmUpAnalysis(practicePlanId).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200)  this.setState({ list: msg, practiceCount: msg.practice.length })
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  next() {
    const { dispatch } = this.props
    const { currentIndex, practiceCount } = this.state
    if (currentIndex < practiceCount - 1) {
      this.setState({ currentIndex: currentIndex + 1 })
    }
  }

  prev() {
    const { dispatch } = this.props
    const { currentIndex } = this.state
    if (currentIndex > 0) {
      this.setState({ currentIndex: currentIndex - 1 })
    }
  }

  nextTask() {
    const { dispatch } = this.props
    const { series, practicePlanId } = this.props.location.query
    dispatch(startLoad())
    loadWarmUpNext(practicePlanId).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200) {
        const item = msg
        const { type, practicePlanId, knowledge, unlocked } = item
        if (!unlocked) {
          dispatch(alertMsg("该训练尚未解锁"))
          return
        }
        if (type === 1 || type === 2) {
          if (item.status === 1) {
            this.context.router.push({
              pathname: '/fragment/practice/warmup/analysis',
              query: { practicePlanId, id: knowledge.id, series }
            })
          } else {
            if (!knowledge.appear) {
              this.context.router.push({
                pathname: '/fragment/practice/warmup/intro',
                query: { practicePlanId, id: knowledge.id, series }
              })
            } else {
              this.context.router.push({
                pathname: '/fragment/practice/warmup/ready',
                query: { practicePlanId, id: knowledge.id, series }
              })
            }
          }
        } else if (type === 11) {
          this.context.router.push({
            pathname: '/fragment/practice/application',
            query: { appId: item.practiceIdList[0], id: knowledge.id, series }
          })
        } else if (type === 21) {
          this.context.router.push({
            pathname: '/fragment/practice/challenge',
            query: { id: item.practiceIdList[0], series }
          })
        }
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  closeModal() {
    this.setState({ showKnowledge: false })
  }

  render() {
    const { list, currentIndex, selected, knowledge, practiceCount, showKnowledge } = this.state
    const { practice = [] } = list
    const { analysis, means, keynote, voice } = knowledge

    const questionRender = (practice) => {
      const { question, voice, analysis, choiceList = [], score = 0 } = practice
      return (
        <div className="intro-container">
          { practiceCount !== 0 && currentIndex <= practiceCount - 1 ? <div className="intro-index">
            <span className="index">第{currentIndex + 1}/{practiceCount}题</span>
            <span className="type"><span className="number">{score}</span>分</span>
          </div> : null}
          { voice ? <div className="context-audio">
            <Audio url={voice}/>
          </div> : null }
          <div className="question">
            <div dangerouslySetInnerHTML={{__html: question}}></div>
          </div>
          <div className="choice-list">
            {choiceList.map((choice, idx) => choiceRender(choice, idx))}
          </div>
          <div className="analysis">
            <div className="analysis-title">【解析】</div>
            <div className="context"
                 dangerouslySetInnerHTML={{__html: practice ? practice.analysis : ''}}></div>
            <div className="knowledge-link" onClick={() => this.setState({showKnowledge: true})}>点击查看知识点</div>
          </div>
        </div>
      )
    }

    const choiceRender = (choice, idx) => {
      const { id, subject } = choice
      return (
        <div key={id} className={`choice${choice.selected ? ' selected' : ''}`}>
          <span className={`index${choice.isRight ? ' right' : ' wrong'}`}>
            {choice.isRight ? <AssetImg type="right" width={13} height={8}/> :
              ( choice.selected ? <AssetImg type="wrong" size={10}/> : sequenceMap[idx])}
          </span>
          <span className={`text${choice.isRight ? ' right' : ' wrong'}`}>{subject}</span>
        </div>
      )
    }

    return (
      <div>
        <div className="container has-footer">
          <div className="warm-up-analysis">
            <div className="page-header">{knowledge.knowledge}</div>
            {questionRender(practice[currentIndex] || {})}
          </div>
        </div>
        <div className="button-footer">
          <div className={`left ${currentIndex === 0 ? ' disabled' : ''}`} onClick={this.prev.bind(this)}>上一题</div>
          {currentIndex + 1 < practiceCount ?
          <div className={`right`} onClick={this.next.bind(this)}>下一题</div> :
          <div className="right" onClick={this.nextTask.bind(this)}>继续训练</div>}
        </div>

        {showKnowledge ? <KnowledgeViewer knowledge={knowledge} closeModal={this.closeModal.bind(this)}/> : null}
      </div>
    )
  }
}