import PropTypes from 'prop-types'

const VoteCard = ({voteData, onClick}) => {
  const clickHandler = () => {
    onClick(voteData.id)
  }
  return <img key={voteData.id} src={voteData.thumbnail} className='shadow-primary rounded-[20px] w-full' onClick={clickHandler} />
}

VoteCard.propTypes = {
  voteData: PropTypes.shape({
    id: PropTypes.number,
    thumbnail: PropTypes.node
  }),
  onClick: PropTypes.func
}

export default VoteCard