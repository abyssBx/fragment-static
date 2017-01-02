import * as React from "react";
import { connect } from "react-redux";
import { remove, set, merge } from "lodash";
import "./Main.less";
import { loadWarmUpPractice, loadKnowledgeIntro, answer } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import Audio from "../../../components/Audio";

const sequenceMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
}

@connect(state => state)
export class Main extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      list: [],
      currentIndex: 0,
      practiceCount: 0,
      selected: [],
      knowledge: {},
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    const { series, sequence } = location.query
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
    loadWarmUpPractice(series, sequence).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200)  this.setState({ list: msg, practiceCount: msg.practice.length })
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onChoiceSelected(choiceId) {
    const { list, currentIndex, selected } = this.state
    const curPractice = list.practice[currentIndex]
    // 暂时没有单选了
    // if (curPractice.type === 1) {
    //   // 单选
    //   this.setState({ selected: [choiceId] })
    // } else if (curPractice.type === 2) {
    let _list = selected
    if (_list.indexOf(choiceId) > -1) {
      remove(_list, n => n === choiceId)
    } else {
      _list.push(choiceId)
    }
    this.setState({ selected: _list })
    // }
  }

  setChoice(cb) {
    let { list, currentIndex, selected } = this.state
    set(list, `practice.${currentIndex}.choice`, selected)
    this.setState({ list }, () => {
      this.setState({ selected: [], currentIndex: currentIndex + 1 })
    })
    if (cb) {
      cb(list.practice)
    }
  }

  onSubmit() {
    const { dispatch } = this.props
    const { selected, practice, currentIndex, practiceCount } = this.state
    if (selected.length === 0) {
      dispatch(alertMsg("你还没有选择答案哦"))
      return
    }
    if (currentIndex < practiceCount - 1) {
      this.setChoice()
    } else {
      console.log('complete')
      this.setChoice(p => {
        dispatch(startLoad())
        answer({ practice: p }).then(res => {
          dispatch(endLoad())
          const { code, msg } = res
          if (code === 200)  this.context.router.push({
            pathname: '/fragment/practice/warmup/result',
            query: merge(msg, this.props.location.query)
          })
          else dispatch(alertMsg(msg))
        })
      })
    }
  }

  render() {
    const { list, currentIndex, selected, knowledge, practiceCount } = this.state
    const { practice = [] } = list

    const questionRender = (practice) => {
      const { question, voice, analysis, choiceList = [], score = 0 } = practice
      return (
        <div className="intro-container">
          { practiceCount !== 0 && currentIndex <= practiceCount - 1 ? <div className="intro-index">
            <span className="index">第{currentIndex + 1}/{practiceCount}题</span>
            <span className="type">{score}分</span>
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
        </div>
      )
    }

    const choiceRender = (choice, idx) => {
      const { id, subject } = choice
      return (
        <div key={id} className={`choice${selected.indexOf(id) > -1 ? ' selected' : ''}`}
             onClick={e => this.onChoiceSelected(id)}>
          <span className="index">{sequenceMap[idx]}</span>
          <span className="text">{subject}</span>
        </div>
      )
    }

    return (
      <div>
        <div className="container" style={{height: window.innerHeight - 75}}>
          <div className="warm-up">
            <div className="page-header">{knowledge.knowledge}</div>
            {questionRender(practice[currentIndex] || {})}
          </div>
        </div>
        <div className="button-submit" onClick={this.onSubmit.bind(this)}>提交</div>
      </div>
    )
  }
}