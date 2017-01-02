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
            <div className="context-img">

            </div>
            <div className="page-header">{knowledge.knowledge}</div>
            <div className="intro-container">
              { voice ? <div className="context-audio">
                <Audio url={voice}/>
              </div> : null }
              <div className="context-img">
                <img src="" alt=""/>
              </div>
              <div className="application-context">
                <div className="section1">
                  <p>好了，今天的知识点学完了，学以致用一下吧！输入是为了更好地输出！</p>
                </div>
                <div className="application-title">
                  <AssetImg type="app" size={15}/><span>今日应用</span>
                </div>
                <div className="section2">
                  <p>
                    多啦A梦是儿时的回忆。你长大了，那个小蓝胖子也长大了。
                  </p>
                  <p>
                    现在，请你用5W1H策划一个方案，来帮助多啦A梦找个女朋友吧！分享给你的童年好友，看看你的选择和Ta心中的是否一致？
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>下一任务</div>
      </div>
    )
  }
}