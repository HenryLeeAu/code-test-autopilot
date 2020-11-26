import styled from 'styled-components'

const ItemWrapper = styled.div`
  display: flex;
  font-size: 14px;
  height:${({itemHeight}) => `${itemHeight}px`};
  align-items: center;
  cursor: pointer;
  padding-left:23px;
  color: ${({highlight}) => highlight ? '#4821ff': '#000'};
  background: ${({highlight}) => highlight ? '#fbfafa': '#fff'};

  &:hover {
    color: #4821ff;
    background: #fbfafa;
  }

`

const FlagImg = styled.img`
  width: 17px;
  margin-right: 15px;
`
const Text = styled.div`
  height:${({itemHeight}) => `${itemHeight}px`} ;
  display: flex;
  align-items: center;
  white-space: nowrap;
  color: ${({highlight}) => highlight ? '#4821ff': '#000'};
  background: ${({highlight}) => highlight ? '#fbfafa': '#fff'};
  &:hover {
    color: #4821ff;
    background: #fbfafa;
  }
`
const Item = ({
  itemHeight,
  name,
  flagUrl,
  onClick,
  highlight,
}) => {
  return (
    <ItemWrapper
      itemHeight={itemHeight}
      onClick={onClick}
      highlight={highlight}
      data-testid='country-item'
    >
      <FlagImg
        data-testid='country-flag'
        src={flagUrl}/>
      <Text
        itemHeight={itemHeight}
        highlight={highlight}
        data-testid='country-name'
      >{name}</Text>
    </ItemWrapper>
  )
}

export default Item
