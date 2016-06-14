import React, { Component, PropTypes } from 'react'
import './styles.styl'

const Timer = ({ seconds, status, actions}) =>
      <div className='block'>
        <div className='msgBlock'>Timer: {seconds}</div>
        <button className='Btn' onClick={actions.start} disabled={status === 'Running'}>
          Start
        </button>
        <button className='Btn' onClick={actions.stop} disabled={status === 'Stopped'}>
          Stop
        </button>
        <button className='Btn' onClick={actions.reset} disabled={status === 'Running'}>
          Reset
        </button>
      </div>

Timer.propTypes = {
  seconds: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['Running', 'Stopped']),
  actions: PropTypes.shape({
    start: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  })
}

export default Timer
