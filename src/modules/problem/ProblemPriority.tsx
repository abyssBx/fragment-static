import * as React from "react";
import { connect } from "react-redux";
import "./ProblemPriority.less";
import { loadMyProblemList } from "./async";
import { startLoad, endLoad, alertMsg } from "redux/actions";
import { Toast, Dialog } from "react-weui";
const { Alert } = Dialog

@connect(state => state)
export class ProblemPriority extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      problemList: [],
      problemSelected: null,
    }
    this.state = {
      showAlert: false,
      alert: {
        buttons: [
          {
            label: '再看看',
            onClick: this.close.bind(this)
          },
          {
            label: '想好了',
            onClick: this.onSubmit.bind(this)
          }
        ]
      },
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
      if (code === 200) {
        if (!msg.problemList.length || msg.problemList.length === 0) {
          this.context.router.push({ pathname: '/rise/static/problem/list' })
        } else {
          if(msg.problemList.length === 1){
            this.setState({problemList:msg.problemList,problemSelected:msg.problemList[0].problemId})
          } else {
            this.setState(msg)
          }
        }
      }
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
    this.context.router.push({ pathname: '/rise/static/problem/report', query: { id: this.state.problemSelected } })
  }

  show() {
    const { dispatch } = this.props;
    const { problemSelected } = this.state;
    if(!problemSelected) {
      dispatch(alertMsg("请先选择接下来要解决的问题"))
    } else {
      this.setState({showAlert: true})
    }
  }

  close() {
    this.setState({ showAlert: false })
  }

  render() {
    const { name, problemList = [], problemSelected } = this.state

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
            { problemList && problemList.length > 0 ? <div className="info">
              <p>不同专题涉及的能力模型不同，每个专题所需的训练时间5~10天不等。</p>
              <p>我会根据你的选择，定制你的训练任务。 </p>
              <p>下面，选择第一个你要训练的专题！完成后，我们再安排下一个。</p>
            </div> : null }
            <div className="list">
              {problemListRender(problemList)}
            </div>
          </div>
        </div>
        <div className="button-footer" onClick={this.show.bind(this)}>下一步</div>
        <Alert { ...this.state.alert }
          show={this.state.showAlert}>
          <p>提交后不能修改，想好了吗？</p>
        </Alert>
      </div>
    )
  }
}
