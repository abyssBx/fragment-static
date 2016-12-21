import * as React from "react";
import { connect } from "react-redux";
import "./Result.less";
import { loadKnowledgeIntro } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";

@connect(state => state)
export class Result extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {}
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
      if (code === 200)  this.setState({ data: msg })
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onSubmit() {
    this.context.router.push({ pathname: '/fragment/practice/warmup', query: this.props.location.query })
  }

  render() {
    const { rightNumber, point } = this.props.location.query
    const { data } = this.state
    const { knowledge, voice, pic, analysis } = data

    return (
      <div className="warm-up-result">
        <div className="container has-footer">
          <div className="header">{knowledge}</div>
          <div className="intro-container">
            <div className="picture">
              <img src="" alt=""/>
            </div>
            <div className="analysis">
              <div>答对题数: {rightNumber}</div>
              <div>任务得分: {point}</div>
            </div>
          </div>
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>
          <div className="left">知识回顾</div>
          <div className="right">下一任务</div>
        </div>
      </div>
    )
  }
}