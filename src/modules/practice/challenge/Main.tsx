import * as React from "react";
import { connect } from "react-redux";
import "./Main.less";
import { loadChallengePractice } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import Audio from "../../../components/Audio";

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
    loadChallengePractice(location.query.id).then(res => {
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

  onCopy() {
    const { dispatch } = this.props
    dispatch(alertMsg('已复制到剪贴板'))
  }

  render() {
    const { data, knowledge = {} } = this.state
    const { voice, pic, description, pcurl } = data

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
              <div className="context" dangerouslySetInnerHTML={{__html: description}}></div>
              <div className="context">
                <p>好的开始是成功的一半！让我们来完成今天最后一个任务--专题训练。</p>
                <p>选择这个专题，你是想实现什么目标呢？制定目标帮你更积极地学习，也带给你更多成就感！</p>
                <p>建议在未来几天的学习中，也在这个任务里记录下通过学习实现目标的情况。现在就去圈外社区写目标吧！</p>
              </div>
              <div className="pc-homework">
                <div className="guide">圈外社区链接</div>
                <div className="sub-guide">（推荐使用电脑端浏览器访问）</div>
                <div className="url">{pcurl}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>返回</div>
      </div>
    )
  }
}