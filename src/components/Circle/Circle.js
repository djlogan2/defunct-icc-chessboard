import React from 'react'
import PropTypes from 'prop-types'

import style from './circle.module.css'

const Circle = ({ size, strokeStyle }) => {
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    context.beginPath()
    context.strokeStyle = strokeStyle
    context.arc(size / 2, size / 2, (size / 2) * 0.9, 0, Math.PI * 2)
    context.stroke()
  }, [])

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <canvas ref={canvasRef} />
    </div>
  )
}

Circle.propTypes = {
  size: PropTypes.number.isRequired
}

export default Circle
