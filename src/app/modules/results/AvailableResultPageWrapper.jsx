import AvailableResultPage from './AvailableResultPage'
import { ResultProvider } from './core/Result'

const AvailableResultPageWrapper = () => {
  return (
    <ResultProvider>
      <AvailableResultPage />
    </ResultProvider>
  )
}

export default AvailableResultPageWrapper