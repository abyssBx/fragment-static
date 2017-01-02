import * as React from "react";
import { connect } from "react-redux";
import "./ProblemPriority.less";
import { loadMyProblemList } from "./async";
import { startLoad, endLoad, alertMsg } from "redux/actions";

@connect(state => state)
export class ProblemPriority extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      problemList: [],
      problemSelected: null,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadMyProblemList().then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200)  this.setState(msg)
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onProblemClicked(problemSelected) {
    this.setState({ problemSelected })
  }


  onSubmit() {
    const { location } = this.props
    const { id } = location.query
    this.context.router.push({ pathname: '/fragment/problem/report', query: { id: this.state.problemSelected } })
  }

  render() {
    const { name, problemList, problemSelected } = this.state

    const problemListRender = (list) => {
      return list.map(item => {
        return (
          <div key={item.problemId} onClick={this.onProblemClicked.bind(this, item.problemId)}>
            <div className={`button-circle${problemSelected === item.problemId ? ' selected' : ''}`}>
              {item.problem}
            </div>
          </div>
        )
      })
    }

    return (
      <div>
        <div className="container has-footer">
          <div className="problem-priority">
            <div className="info">
              <p>很好，接下来思考一下优先级，你第一个想要解决的是？</p>
            </div>
            <div className="list">
              {problemListRender(problemList)}
            </div>
          </div>
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>下一步</div>
      </div>
    )
  }
}