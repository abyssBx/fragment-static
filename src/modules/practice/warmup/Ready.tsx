import * as React from "react";
import { connect } from "react-redux";
import "./Ready.less";
import { loadKnowledgeIntro } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";

@connect(state => state)
export class Ready extends React.Component <any, any> {
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

  }

  render() {
    const { data } = this.state
    const { knowledge, voice, pic, analysis } = data

    return (
      <div className="warm-up-ready">
        <div className="container">
          <div className="header">{knowledge}</div>
          <div className="intro-container">
            <div className="picture">
              <img src="" alt=""/>
            </div>
            <div className="choice-list">
              <div className="choice"
                   onClick={() => this.context.router.push({
                     pathname: '/fragment/practice/warmup',
                     query: this.props.location.query
                   })}>
                开始游戏
              </div>
              <div className="choice"
                   onClick={() => this.context.router.push({
                     pathname: '/fragment/practice/warmup/intro',
                     query: this.props.location.query
                   })}>
                知识回顾
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}