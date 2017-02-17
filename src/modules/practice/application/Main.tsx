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
      submitId: 0,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    dispatch(startLoad())
    loadKnowledgeIntro(location.query.kid).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200)  this.setState({ knowledge: msg })
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
    loadApplicationPractice(location.query.id).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200) {
        const { content } = msg
        this.setState({data: msg, submitId: msg.submitId})
        if (content !== null){
          window.location.href = '#submit'
        }
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onSubmit() {
    const { location } = this.props
    this.context.router.push({
      pathname: '/rise/static/plan/main',
      query: { series: location.query.series }
    })
  }

  onEdit() {
    const { location } = this.props
    this.context.router.push({
      pathname: '/rise/static/practice/application/submit',
      query: { id: location.query.id, series: location.query.series, kid: location.query.kid}
    })
  }

  closeModal() {
    this.setState({ showKnowledge: false })
  }

  render() {
    const { data, knowledge = {}, showKnowledge } = this.state
    const { voice, pic, description, content, submitUpdateTime } = data

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
                  <p>好了，学以致用一下吧！结合相关知识点，思考并实践下面的任务。记录下你的经历，还会收获积分。</p>
                </div>
                <div className="application-title">
                  <AssetImg type="app" size={15}/><span>今日应用</span>
                </div>
                <div className="section2" dangerouslySetInnerHTML={{__html: description}}>
                </div>
              </div>
              <div className="knowledge-link" onClick={() => this.setState({showKnowledge: true})}>点击查看知识点</div>
              <a name="submit"/>
              <div className="submit-bar"><span className="padding"></span>{ content === null?'提交方式':'我的作业'}</div>
              { content === null?
                <div className="no-comment">
                  <AssetImg type="mobile" height={65} marginTop={15}/>
                  <div className="submit" onClick={this.onEdit.bind(this)}>手机提交</div>
                  <div className="content">
                    <div className="text">windows微信客户端也适用</div>
                  </div>
                  <AssetImg type="pc" height={65} marginTop={15}/>
                  <div className="content">
                    <div className="text">更喜欢电脑上提交?</div>
                    <div className="text">登录www.iquanwai.com/community</div>
                  </div>
                </div>
                :
                <div className="has-comment">
                  <div className="submit-cell">
                    <div className="submit-avatar"><img className="submit-avatar-img" src={window.ENV.headImage} /></div>
                    <div className="submit-area">
                      <div className="submit-head">
                        <div className="submit-name">
                          {window.ENV.userName}
                        </div>
                        <div className="right" onClick={this.onEdit.bind(this)}>
                          <div className="submit-icon">
                            <AssetImg type="edit" height={17}/>
                          </div>
                          <div className="submit-button">
                            编辑
                          </div>
                        </div>
                      </div>
                      <pre className="submit-content">{content}</pre>
                      <div className="submit-time">{submitUpdateTime}</div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>返回</div>
        {showKnowledge ? <KnowledgeViewer knowledge={knowledge} closeModal={this.closeModal.bind(this)}/> : null}
      </div>
    )
  }
}
