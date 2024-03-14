import HomePage from './HomePage'
import { ElectionsProvider } from './core/Elections'

const HomePageWrapper = () => {
  return (
    <ElectionsProvider>
      <HomePage />
    </ElectionsProvider>
  )
}

export default HomePageWrapper