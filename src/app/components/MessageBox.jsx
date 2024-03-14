
import PropTypes from 'prop-types'

const MessageBox = ({text, className}) => {
  return <p className={`font-bold text-gray-500 text-lg bg-blue-200 rounded-lg text-center py-5 ${className}`}>{text}</p>
}

MessageBox.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
}

export default MessageBox