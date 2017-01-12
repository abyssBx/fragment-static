import * as React from "react";
import { connect } from "react-redux";
import "./Main.less";
import { loadChallengePractice } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import Audio from "../../../components/Audio";
// import CopyToClipboard from "react-copy-to-clipboard";

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
              <div className="context">输出带动输入，才是最好的学习方式！记录下你参加这个主题训练的小目标、应用任务实践的心得、以及最后的目标完成情况和收获总结吧！还有机会获得圈圈点评。<span
                className="score">(500分)</span></div>
              {/**<CopyToClipboard text={pcurl}
                onCopy={this.onCopy.bind(this)}>**/}
              <div className="pc-homework">
                <div className="guide">请在浏览器地址栏中打开链接（推荐电脑端）</div>
                <div className="url">{pcurl}</div>
              </div>
              {/**</CopyToClipboard>**/}
            </div>
          </div>
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>返回</div>
      </div>
    )
  }
}