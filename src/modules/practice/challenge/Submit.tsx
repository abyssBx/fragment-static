import * as React from "react";
import { connect } from "react-redux";
import {loadChallengePractice, submitChallengePractice, loadChallengePractice} from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";

@connect(state => state)
export class Submit extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      data: {},
      submitId: 0,
      answer: '',
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const {dispatch, location } = this.props
    loadChallengePractice(location.query.id).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200)  this.setState({ data: msg, submitId: msg.submitId, answer: msg.content })
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onSubmit(){
    const { dispatch, location} = this.props
    const { data, answer } = this.state
    const { submitId } = data
    submitChallengePractice(submitId, {answer}).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200) {
        this.context.router.push({ pathname: '/rise/static/practice/challenge',
          query: {id: location.query.id, series: location.query.series}})
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  render() {
    const { data } = this.state
    const { description } = data
    return (
      <div className="submit">
        <div className="description">
          <p>好的开始是成功的一半！让我们来完成今天最后一个任务--专题训练。</p>
          <p>选择这个专题，你是想实现什么目标呢？制定目标帮你更积极地学习，也带给你更多成就感！</p>
          <p>建议在未来几天的学习中，也在这个任务里记录下通过学习实现目标的情况。</p>
        </div>
        <textarea className="submit-area" cols="30" rows="10" height="500px" width="100%"
                    value={this.state.answer}
                    placeholder="写下你的作业（限3000字）"
                    onChange={(e) => this.setState({answer: e.currentTarget.value})}></textarea>
        <div className="submit-button" onClick={this.onSubmit.bind(this)}>提交</div>
      </div>
    )
  }
}
