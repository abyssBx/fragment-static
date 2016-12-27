import * as React from "react";
import "./Audio.less";
import Slider from "react-rangeslider";
import AssetImg from "./AssetImg";

let timer;

export default class Audio extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      duration: 0,
      currentSecond: 0,
      playing: false,
    }
  }

  onReady(e) {
    // alert('canplay')
    this.setState({ duration: e.target.duration })
  }

  onEnd() {
    this.setState({ currentSecond: this.state.duration, playing: false })
    clearInterval(timer)
  }

  start() {
    const self = this
    if (timer) {
      clearInterval(timer)
    }
    if (this.state.currentSecond >= this.state.duration) {
      this.setState({ currentSecond: 0 })
    }
    this.setState({ playing: true })
    timer = setInterval(() => {
      self.setState({ currentSecond: self.state.currentSecond + 1 })
    }, 1000)
    this.refs.sound.play()
  }

  pause() {
    this.setState({ playing: false })
    clearInterval(timer)
    this.refs.sound.pause()
  }

  stop() {
    clearInterval(timer)
    this.refs.sound.pause()
    this.refs.sound.load()
    this.setState({ playing: false, currentSecond: 0 })
  }

  onProgressChange(value) {
    if (value === 100) {
      this.pause()
      this.setState({ currentSecond: this.state.duration })
      return
    }
    this.setState({ playing: true, currentSecond: value / 100 * this.state.duration })
    clearInterval(timer)
    this.start()
    this.refs.sound.currentTime = value / 100 * this.state.duration
    this.refs.sound.play()
  }

  render() {
    const { url } = this.props
    const { currentSecond, playing, duration } = this.state
    // if ((!duration || duration < 0) && this.refs.sound && this.refs.sound.duration) {
    // 	this.setState({ duration: this.refs.sound.duration })
    // }

    return false ?
      <div className="audio">
        <div className="audio-container">
          { playing ?
          <div className="audio-btn" onClick={this.pause.bind(this)}><AssetImg type="sound_active" size={20}/></div> :
          <div className="audio-btn" onClick={this.start.bind(this)}><AssetImg type="sound" size={20}/></div>}
          <div className="audio-duration">{ intToTime(currentSecond) }/{intToTime(duration)}</div>
          <div className="audio-progress">
            <Slider
              value={currentSecond / duration * 100}
              orientation="horizontal"
              onChange={this.onProgressChange.bind(this)}
            />
          </div>
        </div>
        <audio ref="sound" src={url}
               preload="auto"
               onCanPlay={this.onReady.bind(this)}
               onEnded={this.onEnd.bind(this)}/>
      </div>:<audio src={url} ref="sound" controls="controls"></audio>
  }
}

function intToTime(val) {
  return new Date(val * 1000).toISOString().substr(14, 5)
}