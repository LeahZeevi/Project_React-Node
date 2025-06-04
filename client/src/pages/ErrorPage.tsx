import type { FC } from "react"
import "../css/Error.css"

interface ErrorPageProps {
  errorMessage?: string
}

const ErrorPage: FC<ErrorPageProps> = ({ errorMessage = "An unexpected error occurred" }) => {
  return (
    <div className="error-container">
      <div className="error-content">
        {/* Decorative elements */}
        <div className="decorative-circle circle-1"></div>
        <div className="decorative-circle circle-2"></div>
        <div className="decorative-circle circle-3"></div>

        {/* Content */}
        <div className="error-content-inner">
          <div className="error-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" />
            </svg>
          </div>
          <h1 className="error-title">ERROR</h1>
          <p className="error-subtitle">Something went wrong</p>
          <p className="error-description">{errorMessage}</p>
        </div>
      </div>

      {/* Error code */}
      <div className="error-code">ERROR</div>
    </div>
  )
}

export default ErrorPage
