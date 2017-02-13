import * as React from "react";
import { connect } from "react-redux";
import "./Intro.less";
import { loadKnowledgeIntro, learnKnowledge } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import Audio from "../../../components/Audio";
import AssetImg from "../../../components/AssetImg";

@connect(state => state)
export class Intro extends React.Component <any, any> {
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
      if (code === 200) {
        this.setState({ data: msg })
        learnKnowledge(location.query.id)
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onSubmit() {
    this.context.router.push({ pathname: '/rise/static/practice/warmup', query: this.props.location.query })
  }

  render() {
    const { data } = this.state
    const { knowledge, voice, pic, analysis, means, keynote } = data

    return (
      <div>
        <div className="container has-footer">
          <div className="warm-up-intro">
            <div className="page-header">{knowledge}</div>
            <div className="intro-container">
              { voice ? <div className="context-audio">
                <Audio url={voice}/>
              </div> : null }
              <div className="context-title-img">
                <AssetImg width={48} height={18} type="analysis"/>
              </div>
              <div className="context" dangerouslySetInnerHTML={{__html: analysis}}>
              </div>
              <div className="context-title-img">
                <AssetImg width={50} height={16} type="means"/>
              </div>
              <div className="context" dangerouslySetInnerHTML={{__html: means}}>
              </div>
              <div className="context-title-img">
                <AssetImg width={50} height={18} type="keynotes"/>
              </div>
              <div className="context" dangerouslySetInnerHTML={{__html: keynote}}>
              </div>
            </div>
          </div>
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>开始训练</div>
      </div>
    )
  }
}
