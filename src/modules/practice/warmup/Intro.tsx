import * as React from "react";
import { connect } from "react-redux";
import "./Intro.less";
import { loadKnowledgeIntro } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import Audio from "../../../components/Audio";

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
    const { data } = this.state
    const { knowledge, voice, pic, analysis } = data

    return (
      <div className="warm-up-intro">
        <div className="container has-footer">
          <div className="header">{knowledge}</div>
          <div className="intro-container">
            { voice ? <div className="audio">
              <Audio url={voice}/>
            </div> : null }
            <div className="picture">
              <img src="" alt=""/>
            </div>
            <div className="analysis">
              <div dangerouslySetInnerHTML={{__html: analysis}}></div>
            </div>
          </div>
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>开始游戏</div>
      </div>
    )
  }
}