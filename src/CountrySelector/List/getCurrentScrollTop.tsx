type ParamT = {
  maxVisibleNumber: number;
  position: number;
  currentIndex: number;
  itemHeight: number;
};
const getCurrentScrollTop = ({
  maxVisibleNumber,
  position,
  currentIndex,
  itemHeight,
}: ParamT): number => {
  const times = Math.floor((currentIndex + 1) / maxVisibleNumber);

  const extraSize = (currentIndex + 1) % maxVisibleNumber;

  const finalTop =
    times * itemHeight * maxVisibleNumber + (extraSize - position) * itemHeight;

  return finalTop;
};

export default getCurrentScrollTop;
