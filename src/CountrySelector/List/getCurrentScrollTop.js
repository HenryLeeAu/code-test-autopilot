const getCurrentScrollTop = ({
  maxVisibleNumber, position, currentIndex, length, itemHeight
}) => {

  const times = Math.floor((currentIndex+1) / maxVisibleNumber);

  const extraSize = (currentIndex+1) % maxVisibleNumber;


  const finalTop = (
    times * itemHeight * maxVisibleNumber
    + (extraSize - position) * itemHeight
  )

  return finalTop
}

export default getCurrentScrollTop;
