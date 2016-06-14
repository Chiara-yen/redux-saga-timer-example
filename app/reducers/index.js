const initSate = {
  status: 'Stopped',
  seconds: 0
}

export default function timer(state = initSate, action) {
  switch (action.type) {
    case 'START':
      return Object.assign({}, state, {status: 'Running'})

    case 'STOP':
      return Object.assign({}, state, {status: 'Stopped'})

    case 'TICK':
      return Object.assign({}, state, {seconds: state.seconds + 1 })

    case 'RESET':
      return Object.assign({}, state, {seconds: 0 })

    default:
      return state
  }
}