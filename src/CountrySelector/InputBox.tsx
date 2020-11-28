import * as React from "react";
import styled from "styled-components";

import arrowDown from "../images/arrow-down.svg";
import { InputRestPropsT } from "./type";

type Props = InputRestPropsT & {
  onFocus: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
  isOpen: boolean;
  flagSrc?: string;
};
const InputWrapper = styled.div`
  width: 200px;
  height: 36px;
  position: relative;
`;
const Input = styled.input<{ isOpen: boolean; flagExist: boolean }>`
  box-sizing: border-box;
  outline: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: ${({ isOpen, theme }) =>
    `2px solid ${isOpen ? theme.colors.primary : "#fff"}`};
  width: inherit;
  height: inherit;
  font-size: ${({ theme }) => theme.fontSize.md};
  padding: ${({ flagExist }) => ` 0 24px 0 ${flagExist ? 40 : 14}px`};
`;
const ArrowIcon = styled.img`
  width: 9px;
  position: absolute;
  right: 14px;
  top: 14px;
`;

const FlagIcon = styled.img`
  width: 16px;
  position: absolute;
  left: 14px;
  top: 12px;
`;
const InputBox: React.FC<Props> = ({
  onFocus,
  onChange,
  text,
  isOpen,
  flagSrc = "",
  ...restProps
}) => {
  return (
    <InputWrapper onClick={onFocus}>
      {flagSrc && (
        <FlagIcon
          src={flagSrc}
          alt="arrow"
          data-testid="country-selector-input-lag"
        />
      )}
      <Input
        {...restProps}
        placeholder="Select"
        onChange={onChange}
        value={text}
        isOpen={isOpen}
        flagExist={!!flagSrc}
      />
      <ArrowIcon src={arrowDown} alt="arrow" />
    </InputWrapper>
  );
};

export default InputBox;
