type ParamT = {
  maxVisibleNumber: number;
  position: number;
  currentIndex: number;
  itemHeight: number;
};

/**
 * Get the scroll top distance
 * @param obj Object with all properties
 * @param obj.maxVisibleNumber Number of showing on dropdown visible area.
 * @param obj.position Default position for selecting item when open dropdown.
 * @param obj.currentIndex The index of selected item.
 * @param obj.itemHeight The UI height each item.
 * @returns {number} scroll top number
 */

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
