import * as React from "react";
import {connect} from "react-redux";
import "./Discuss.less";
import {discuss} from "../warmup/async";
import {startLoad, endLoad, alertMsg} from "../../../redux/actions";
import {merge} from "lodash";

@connect(state => state)
export default class Discuss extends React.Component <any, any> {
  constructor(props) {
    super()
    const {repliedId, closeModal, warmupPracticeId} = props
    this.state = {
      discuss: {},
      repliedId: repliedId,
      warmupPracticeId: warmupPracticeId,
      comment: "",
      closeModal: closeModal
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  onSubmit() {
    const {dispatch} = this.props
    const {warmupPracticeId, repliedId, comment, closeModal} = this.state
    if(comment.length==0){
      dispatch(alertMsg('请填写评论'))
      return
    }
    if(comment.length>300){
      dispatch(alertMsg('您的评论字数已超过300字'))
      return
    }
    let discuss_body = {comment: comment, warmupPracticeId: warmupPracticeId}
    if (repliedId) {
      merge(discuss_body, {repliedId: repliedId})
    }

    discuss(discuss_body).then(res => {
      const {code, msg} = res
      if (code === 200) closeModal()
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(alertMsg(ex))
    })

  }

  render() {
    return (
      <div>
        <div className="container">
          <textarea className="discuss-comment" cols="30" rows="10" height="500px" width="100%"
                    value={this.state.comment}
                    placeholder={this.state.repliedId?"解答同学的提问（限300字）":"分享你对本题的见解吧（限300字）"}
                    onChange={(e) => this.setState({comment: e.currentTarget.value})}/>
          <div className="discuss-submit" onClick={this.onSubmit.bind(this)}>提交</div>

        </div>

      </div>
    )
  }
}
