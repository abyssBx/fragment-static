import * as React from "react";
import { connect } from "react-redux";
import "./Main.less";
import { loadKnowledgeIntro, loadApplicationPractice, loadWarmUpNext } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import Audio from "../../../components/Audio";
import AssetImg from "../../../components/AssetImg";

@connect(state => state)
export class Main extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {},
      knowledge: {},
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
      if (code === 200)  this.setState({ knowledge: msg })
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
    loadApplicationPractice(location.query.appId).then(res => {
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
    const { data, knowledge = {} } = this.state
    const { voice, pic, description } = data

    return (
      <div>
        <div className="container has-footer">
          <div className="application">
            <div className="page-header">{knowledge.knowledge}</div>
            <div className="intro-container">
              { voice ? <div className="context-audio">
                <Audio url={voice}/>
              </div> : null }
              <div className="context-img">
                <img src="http://www.iquanwai.com/images/fragment/application_practice.png" alt=""/>
              </div>
              <div className="application-context">
                <div className="section1">
                  <p>好了，今天的知识点学完了，学以致用一下吧！思考、实践下面的内容，如果有心得或疑问，请在挑战训练的链接中记录下来，将有机会得到圈圈的反馈。</p>
                </div>
                <div className="application-title">
                  <AssetImg type="app" size={15}/><span>今日应用</span>
                </div>
                <div className="section2" dangerouslySetInnerHTML={{__html: description}}>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>继续训练</div>
      </div>
    )
  }
}