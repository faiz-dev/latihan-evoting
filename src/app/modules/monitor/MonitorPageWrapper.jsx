import { GroupProvider } from '../token-generator/core/Group'
import MonitorPage from './MonitorPage'
import { GroupMemberCountProvider } from './core/GroupMemberCount'
import { GroupVoteCountProvider } from './core/GroupVoteCount'

const MonitorPageWrapper = () => {
  return (
    <GroupProvider>
      <GroupMemberCountProvider>
        <GroupVoteCountProvider>
          <MonitorPage />
        </GroupVoteCountProvider>
      </GroupMemberCountProvider>
    </GroupProvider>
  )
}

export default MonitorPageWrapper