import styled from 'styled-components'
import arrowDown from '../images/arrow-down.svg';

const InputWrapper = styled.div`
  width:200px;
  height:36px;
  position:relative;
`;
const Input = styled.input`
  box-sizing: border-box;
  outline: none;
  border-radius: 4px;
  border:${(({open}) => `2px solid ${open ? '#4821ff': '#fff'}`)};
  width: inherit;
  height: inherit;
  font-size: 14px;
  padding: ${(({flagExist}) => ` 0 24px 0 ${flagExist ? 40 : 14}px`)};
`
const ArrowIcon = styled.img`
  width: 9px;
  position: absolute;
  right: 14px;
  top: 14px;
`

const FlagIcon = styled.img`
  width: 16px;
  position: absolute;
  left: 14px;
  top: 12px;
`
const InputBox = ({
  onFocus,
  onBlur,
  onChange,
  text,
  open,
  flagSrc = "",
  ...restProps
}) => {
  return (
  <InputWrapper onClick={onFocus}>
     {
       flagSrc && (
        <FlagIcon
          src={flagSrc}
          alt="arrow"
          data-testid='country-selector-input-lag'
        />
       )
     }
    <Input
      {...restProps}
      placeholder="Select"
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      value={text}
      open={open}
      flagExist={!!flagSrc}
    />
    <ArrowIcon
      src={arrowDown}
      alt="arrow"
    />
  </InputWrapper>
  )
}

export default InputBox;
