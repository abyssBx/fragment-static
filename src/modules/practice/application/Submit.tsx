import * as React from "react";
import { connect } from "react-redux";
import { loadApplicationPractice, submitApplicationPractice } from "./async";
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
    loadApplicationPractice(location.query.appId).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200)  this.setState({ data: msg, submitId: msg.submitId })
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
    submitApplicationPractice(submitId, {answer}).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200) {
        console.log(location.query.id)
        this.context.router.push({ pathname: '/rise/static/practice/application',
          query: {appId: location.query.appId, id: location.query.id,
            series: location.query.series}})
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
        <div className="description" dangerouslySetInnerHTML={{__html: description}}>
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
