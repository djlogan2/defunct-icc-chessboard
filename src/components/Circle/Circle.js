import React from 'react'
import PropTypes from 'prop-types'

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
    <div
      style={{
        position: 'absolute',
        margin: 0,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: size,
        height: size
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}

Circle.propTypes = {
  size: PropTypes.number.isRequired
}

export default Circle
