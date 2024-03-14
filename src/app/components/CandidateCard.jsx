import PropTypes from 'prop-types'

function CandidateCard({data, selected, onClick}) {
  const handleClick = () => {
    onClick(data.id)
  }
  return (
    <>
      <div className="w-half">
        <img src={selected == data.id ? data.thumbnailActive : data.thumbnail} className='shadow-primary rounded-[20px] w-full' onClick={handleClick} />
      </div>
    </>
  )
}



CandidateCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    thumbnail: PropTypes.node,
    thumbnailActive: PropTypes.node,
  }),
  selected: PropTypes.number,
  onClick: PropTypes.func,
}
export default CandidateCard