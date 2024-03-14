import { useEffect, useState } from 'react'
import { useGroup } from './core/Group'
import { useGroupMember } from './core/GroupMember'
import MessageBox from '../../components/MessageBox'
import { useGroupVotes } from './core/GroupVotes'
import { useLoginToken } from './core/LoginTOken'

const TokenGeneratorPage = () => {
  const { data: groups, fetchGroup } = useGroup()
  const { isLoading: memberLoading, isError: memberError, data: members, fetchMember } = useGroupMember()
  const [selectedGroup, setSelectedGroup] = useState("")
  const { isLoading: votesLoading, isError: votesError, data: gVotes, fetchVote } = useGroupVotes()
  const {data: tokenData, fetchTokens, isError: tokenError, isLoadingGenerate, isErrorGenerate, generateToken} = useLoginToken()
  const [ generatorLoadingIdx, setGeneratorLoadingIdx] = useState("")

  useEffect(() => {
    fetchGroup()
  }, [])

  useEffect(() => {
    if(selectedGroup == "") return
    initData()
  }, [selectedGroup])

  const calculateDiff = (dateObject) => {
    const diff = (dateObject.getTime() - new Date().getTime()) / 1000
    return Math.round(Math.abs(diff/60))
  }

  const handleChange = (gIdx) => {
    setSelectedGroup(gIdx)
  }

  const handleGenerate = async (uid) => {
    setGeneratorLoadingIdx(uid)
    await generateToken(uid, groups[selectedGroup].id)
    setGeneratorLoadingIdx("")
  }

  const initData = async () => {
    fetchMember(groups[selectedGroup].id)
    fetchVote(groups[selectedGroup].id, 1)
    fetchTokens(groups[selectedGroup].id)
  }

  const handleReload = async () => {
    initData()
  }

  return (
    <>
      <h1 className='title'>Token Generator Page</h1>
      <br />
      {/* {groups.length} */}
      <div className='flex justify-between'>
        <select name="" id="" onChange={(e) => { handleChange(e.target.value) }} className='px-3 py-2 border border-gray-400 rounded'>
          <option value={""}>Pilih Grup</option>
          {groups.map((g, idx) => (
            <option value={idx} key={g.id}>{g.name}</option>
          ))}
        </select>
        <button className='bg-yellow-400 px-4 py-1 rounded text-black font-bold' onClick={handleReload}>Reload Data</button>
      </div>

      {selectedGroup == "" && <MessageBox text={"Pilih Grup Terlebih dahulu"} className={'mt-5'} />}
      {memberLoading && <MessageBox text={"Sedang memuat data"} className={'mt-5'} />}
      {memberError && <MessageBox text={"Gagal mendapatkan data member"} className={'mt-5 bg-red-300'} />}
      {/* {memberError} */}
      {
        selectedGroup!= "" &&
        <table className='table-auto w-full border mt-10'>
          <thead>
            <tr className='border-b border-black'>
              <th>No</th>
              <th>Nama</th>
              <th>Group</th>
              <th>Sudah memilih</th>
              <th className='text-center'>Token</th>
              <th className='text-center'>Generator</th>
            </tr>
          </thead>
          <tbody>
            {members.length == 0 && <tr><td colSpan={4} className='text-center h-[50px]'>Tidak ada data</td></tr>}
            {members.map((u,idx) => (
              <tr className='border-b border-black h-[100px]' key={u.id}>
                <td>{idx + 1}</td>
                <td>{u.nickname.toUpperCase()}</td>
                <td>{groups[selectedGroup].name}</td>
                <td>
                  {
                    gVotes.includes(u.id) 
                    ? <span className='bg-green-400 py-2 px-3 rounded'>Sudah</span> 
                    : <span className='bg-gray-600 py-2 px-3 text-white rounded'>Belum</span>
                  }</td>
                <td  className='text-center'>
                  {
                    tokenData[u.id] 
                    ? <>
                      <span className='font-bold py-1 px-1 rounded bg-yellow-200'>{tokenData[u.id].token}</span> <br />{new Date(tokenData[u.id].createdAt).toLocaleTimeString()} <br />
                      {calculateDiff(new Date(tokenData[u.id].createdAt))} minutes
                    </> 
                    : <></>
                  }
                </td>
                <td width="150px" className='text-center' >
                    {gVotes.includes(u.id) ? <></>:<button className='rounded py-2 px-4 bg-blue-800 text-white' onClick={() => handleGenerate(u.id)}>{generatorLoadingIdx == u.id ? "Loading": "Generate"}</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </>
  )
}

export default TokenGeneratorPage