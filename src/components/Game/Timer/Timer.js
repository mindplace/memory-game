import React from 'react'
import PropTypes from 'prop-types'

import styles from '../Game.scss'

export const formatTime = (time) => {
  if (time < 0) return '--:--'
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const mm = m < 10 ? `0${m}` : m
  const s = time % 60
  const ss = s < 10 ? `0${s}` : s
  if (h > 0) return [h, mm, ss].join(':')
  return `${m}:${ss}`
}

class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      secondsElapsed: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldStart && !this.props.shouldStart) {
      this.startTimer()
    }

    if (nextProps.shouldStop && !this.props.shouldStop) {
      this.stopTimer()
    }
  }

  stopTimer() {
    clearInterval(this.interval)
    this.props.emitTotalTime(this.state)
  }

  startTimer() {
    this.interval = setInterval(this.tick.bind(this), 1000)
  }

  tick() {
    this.setState({
      secondsElapsed: this.state.secondsElapsed + 1,
    })
  }

  render() {
    return (
      <div className={styles.timer}>
        <span className={styles.elapsedTime}>Elapsed Time:</span>
        <span className={styles.timerCounter}>{formatTime(this.state.secondsElapsed)}</span>
      </div>
    )
  }
}

Timer.propTypes = {
  secondsElapsed: PropTypes.number,
}

export default Timer
