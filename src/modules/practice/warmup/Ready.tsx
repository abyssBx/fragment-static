import * as React from "react";
import { connect } from "react-redux";
import "./Ready.less";
import { loadKnowledgeIntro } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import AssetImg from "../../../components/AssetImg";

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
            <div className="context-img">
              <AssetImg url="http://www.iquanwai.com/images/fragment/practice_start.png" width={'100%'}/>
              <div className="tips"><AssetImg type="hoshi" width={9}
                                              height={11}/><span>共三道不定项选择题, 做完后统一看解析</span></div>
            </div>
            <div className="choice-list">
              <div className="choice review"
                   onClick={() => this.context.router.push({
                     pathname: '/rise/static/practice/warmup/intro',
                     query: this.props.location.query
                   })}>
                知识点
              </div>
              <div className="choice start"
                   onClick={() => this.context.router.push({
                     pathname: '/rise/static/practice/warmup',
                     query: this.props.location.query
                   })}>
                开始训练
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
