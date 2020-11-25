const getCurrentScrollTop = ({
  maxVisibleItemNumber, position, currentIndex, length, itemHeight
}) => {

  const times = Math.floor((currentIndex+1) / maxVisibleItemNumber);

  const extraSize = (currentIndex+1) % maxVisibleItemNumber;


  const finalTop = (
    times * itemHeight * maxVisibleItemNumber
    + (extraSize - position) * itemHeight
  )

  return finalTop
}

export default getCurrentScrollTop;
