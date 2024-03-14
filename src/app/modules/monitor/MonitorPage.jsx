import { useEffect } from 'react'
import { useGroup } from '../token-generator/core/Group'
import { useGroupMemberCount } from './core/GroupMemberCount'
import { useGroupVoteCount } from './core/GroupVoteCount'

const MonitorPage = () => {
  const { data: groups, fetchGroup } = useGroup()
  const {fetchMember, data: membersCount} = useGroupMemberCount()
  const {fetchVote, data: votesCount} = useGroupVoteCount()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    fetchGroup()
    fetchMember()
    fetchVote()
  }

  const handleReload = async () => {
    loadData()
  }

  return (
    <>
      <h1 className='title'>Votes Monitoring Page</h1>
      <br />
      {/* {groups.length} */}
      <div className='flex justify-end'>
        <button className='bg-yellow-400 px-4 py-1 rounded text-black font-bold' onClick={handleReload}>Reload Data</button>
      </div>

      {/* {memberLoading && <MessageBox text={"Sedang memuat data"} className={'mt-5'} />}
      {memberError && <MessageBox text={"Gagal mendapatkan data member"} className={'mt-5 bg-red-300'} />} */}


      <table className='table-auto w-full border mt-10'>
        <thead>
          <tr className='border-b border-black'>
            <th>No</th>
            <th>Nama Group</th>
            <th>Jumlah Member</th>
            <th>Jumlah Vote</th>
          </tr>
        </thead>
        <tbody>
          {groups.length == 0 && <tr><td colSpan={4} className='text-center h-[30px]'>Tidak ada data</td></tr>}
          {groups.map((g, idx) => (
            <tr className='border-b border-black h-[50px]' key={g.id}>
              <td>{idx + 1}</td>
              <td>{g.name.toUpperCase()}</td>
              <td>{membersCount && membersCount.filter(m => m.groupsId == g.id).length > 0 && membersCount.filter(m => m.groupsId == g.id)[0].memNum}</td>
              
              <td width="150px" className='text-center' >
                {votesCount && votesCount.filter(m => m.groupId == g.id).length > 0 && votesCount.filter(m => m.groupId == g.id)[0].votesNum}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default MonitorPage