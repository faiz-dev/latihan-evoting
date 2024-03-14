import TokenGeneratorPage from './TokenGeneratorPage'
import { GroupProvider } from './core/Group'
import { GroupMemberProvider } from './core/GroupMember'
import { GroupVotesProvider } from './core/GroupVotes'
import { LoginTokenProvider } from './core/LoginTOken'

const TokenGeneratorPageWrapper = () => {
  return (
    <GroupProvider>
      <GroupMemberProvider>
        <GroupVotesProvider>
          <LoginTokenProvider>
            <TokenGeneratorPage />
          </LoginTokenProvider>
        </GroupVotesProvider>
      </GroupMemberProvider>
    </GroupProvider>
  )
}

export default TokenGeneratorPageWrapper