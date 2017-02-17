import * as React from "react";
import { connect } from "react-redux";
import "./Main.less";
import { loadChallengePractice } from "./async";
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
      submitId: 0,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    dispatch(startLoad())
    loadChallengePractice(location.query.id).then(res => {
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
      pathname: '/rise/static/practice/challenge/submit',
      query: { id: location.query.id, series: location.query.series}
    })
  }

  onCopy() {
    const { dispatch } = this.props
    dispatch(alertMsg('已复制到剪贴板'))
  }

  render() {
    const { data, knowledge = {} } = this.state
    const { voice, pic, description, content, submitUpdateTime } = data

    return (
      <div>
        <div className="container has-footer">
          <div className="challenge">
            <div className="intro-container">
              { voice ? <div className="context-audio">
                <Audio url={voice}/>
              </div> : null }
              <div className="context-img">
                <img src="http://www.iquanwai.com/images/fragment/challenge_practice.png" alt=""/>
              </div>
              {/*<div className="context" dangerouslySetInnerHTML={{__html: description}}></div>*/}
              <div className="context">
                <p>好的开始是成功的一半！让我们来完成今天最后一个任务--专题训练。</p>
                <p>选择这个专题，你是想实现什么目标呢？制定目标帮你更积极地学习，也带给你更多成就感！</p>
                <p>建议在未来几天的学习中，也在这个任务里记录下通过学习实现目标的情况。</p>
              </div>
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
      </div>
    )
  }
}
