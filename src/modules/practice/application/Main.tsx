import * as React from "react";
import { connect } from "react-redux";
import "./Main.less";
import { loadKnowledgeIntro, loadApplicationPractice } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import Audio from "../../../components/Audio";
import AssetImg from "../../../components/AssetImg";
import KnowledgeViewer from "../components/KnowledgeViewer";

@connect(state => state)
export class Main extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {},
      knowledge: {},
      showKnowledge: false,
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
    this.context.router.push({
      pathname: '/fragment/plan/main',
      query: { series: this.props.location.query.series }
    })
  }

  closeModal() {
    this.setState({ showKnowledge: false })
  }

  render() {
    const { data, knowledge = {}, showKnowledge } = this.state
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
                  <p>好了，学以致用一下吧！结合相关知识点，思考并实践下面的任务。在圈外社区里记录下你的经历，还会收获积分。</p>
                </div>
                <div className="application-title">
                  <AssetImg type="app" size={15}/><span>今日应用</span>
                </div>
                <div className="section2" dangerouslySetInnerHTML={{__html: description}}>
                </div>
              </div>
              <div className="knowledge-link" onClick={() => this.setState({showKnowledge: true})}>点击查看知识点</div>
              <div className="pc-homework">
                <div className="guide">圈外社区链接</div>
                <div className="sub-guide">（推荐使用电脑端浏览器访问）</div>
                <div className="url">{"http://www.iquanwai.com/community"}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>返回</div>
        {showKnowledge ? <KnowledgeViewer knowledge={knowledge} closeModal={this.closeModal.bind(this)}/> : null}
      </div>
    )
  }
}