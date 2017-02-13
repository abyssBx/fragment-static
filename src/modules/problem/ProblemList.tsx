import * as React from "react";
import { connect } from "react-redux";
import "./ProblemList.less";
import { remove } from "lodash";
import { loadProblemList, submitProblemList } from "./async";
import { startLoad, endLoad, alertMsg } from "redux/actions";

@connect(state => state)
export class ProblemList extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      name: [],
      problemList: [],
      problemListSelected: [],
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadProblemList().then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200) {
        if (!msg.problemList.length && msg.problemList.length === 0) {
          // this.context.router.push({ pathname: '/rise/problem/priority' })
          dispatch(alertMsg('问题列表为空, 请联系管理员'))
        } else {
          this.setState(msg)
        }
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onProblemClicked(id) {
    let { problemListSelected } = this.state
    if (problemListSelected.indexOf(id) > -1) {
      remove(problemListSelected, i => i === id)
    } else {
      problemListSelected.push(id)
    }
    this.setState({ problemListSelected })
  }

  onSubmit() {
    const { dispatch } = this.props
    const { problemListSelected } = this.state
    if (!problemListSelected || problemListSelected.length === 0) {
      dispatch(alertMsg('你还没有选择想要解决的问题'))
      return
    }
    dispatch(startLoad())
    submitProblemList({ problemIdList: problemListSelected }).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200)  this.context.router.push({ pathname: '/rise/static/problem/priority' })
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  render() {
    const { name, problemList, problemListSelected } = this.state

    const problemListRender = (list) => {
      return list.map(item => {
        return (
          <div key={item.id} onClick={this.onProblemClicked.bind(this, item.id)}>
            <div className={`button-circle${problemListSelected.indexOf(item.id) > -1 ? ' selected' : ''}`}>
              {item.problem}
            </div>
          </div>
        )
      })
    }

    return (
      <div>
        <div className="container has-footer">
          <div className="problem-list">
            { problemList && problemList.length > 0 ? <div className="info">
              <p>你好，{name}，我是你的圈外每日提升教练。</p>
              <p>训练开始前，我想更了解你的情况。</p>
              <p>以下的专题，你对哪些感兴趣呢？</p>
              <p>(可多选)</p>
            </div> : null }
            <div className="list">
              {problemListRender(problemList)}
            </div>
          </div>
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>选好了</div>
      </div>
    )
  }
}
