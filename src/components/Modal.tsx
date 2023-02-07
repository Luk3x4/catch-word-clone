import React from 'react'

interface Props {
  score: number,
  stage: number
}

const Modal: React.FC<Props> = ({ score, stage }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2> Game Over </h2>
        <h2 className="modal-text">
          Your Score Is {score} And Reached Stage {stage}, Play Again
        </h2>
        <button onClick={() => window.location.reload()}> Play Again </button>
      </div>
    </div>
  )
}

export default Modal