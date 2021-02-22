import React from 'react'

export default function withWindowSize(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = this.getInitialState()
    }

    getInitialState = () => {
      return {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      }
    }

    componentDidMount() {
      window.addEventListener('resize', this.updateWindowSize)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowSize)
    }

    updateWindowSize = () => {
      this.setState({
        windowWidth: window.innerWidth,
        height: window.innerHeight
      })
    }

    render() {
      const { windowWidth, windowHeight } = this.state

      return (
        <WrappedComponent
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          {...this.props}
        />
      )
    }
  }
}
