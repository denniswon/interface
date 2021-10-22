import { Trans } from '@lingui/macro'
import { darken } from 'polished'
import { ReactNode } from 'react'
import styled from 'styled-components/macro'

const ToggleElement = styled.span<{ isActive?: boolean; isOnSwitch?: boolean }>`
  padding: 0.25rem 0.6rem;
  border-radius: 9px;
  background: ${({ theme, isActive, isOnSwitch }) => (isActive ? (isOnSwitch ? theme.primary1 : theme.bg4) : 'none')};
  color: ${({ theme, isActive }) => (isActive ? theme.white : theme.text2)};
  font-size: 14px;
  font-weight: ${({ isOnSwitch }) => (isOnSwitch ? '500' : '400')};
  :hover {
    user-select: ${({ isOnSwitch }) => (isOnSwitch ? 'none' : 'initial')};
    background: ${({ theme, isActive, isOnSwitch }) =>
      isActive ? (isOnSwitch ? darken(0.05, theme.primary1) : darken(0.05, theme.bg4)) : 'none'};
    color: ${({ theme, isActive, isOnSwitch }) => (isActive ? (isOnSwitch ? theme.white : theme.white) : theme.text3)};
  }
`

const StyledToggle = styled.button<{ isActive?: boolean; activeElement?: boolean }>`
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.bg0};
  display: flex;
  width: fit-content;
  cursor: pointer;
  outline: none;
  padding: 2px;
`

interface ToggleProps {
  id?: string
  isActive: boolean
  toggle: () => void
  checked?: ReactNode
  unchecked?: ReactNode
}

export default function Toggle({
  id,
  isActive,
  toggle,
  checked = <Trans>On</Trans>,
  unchecked = <Trans>Off</Trans>,
}: ToggleProps) {
  return (
    <StyledToggle id={id} isActive={isActive} onClick={toggle}>
      <ToggleElement isActive={isActive} isOnSwitch={true}>
        {checked}
      </ToggleElement>
      <ToggleElement isActive={!isActive} isOnSwitch={false}>
        {unchecked}
      </ToggleElement>
    </StyledToggle>
  )
}

export const ToggleWrapper = styled.button<{ width?: string }>`
  display: flex;
  align-items: center;
  width: ${({ width }) => width ?? '100%'}
  padding: 1px;
  background: ${({ theme }) => theme.bg2};
  border-radius: 12px;
  border: ${({ theme }) => '2px solid ' + theme.bg2};
  cursor: pointer;
  outline: none;
  color: ${({ theme }) => theme.text2};

`

export const ToggleElementFree = styled.span<{ isActive?: boolean; fontSize?: string }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 2px 10px;
  border-radius: 12px;
  justify-content: center;
  height: 100%;
  background: ${({ theme, isActive }) => (isActive ? theme.black : 'none')};
  color: ${({ theme, isActive }) => (isActive ? theme.text1 : theme.text2)};
  font-size: ${({ fontSize }) => fontSize ?? '1rem'};
  font-weight: 600;
  white-space: nowrap;
  :hover {
    user-select: initial;
    color: ${({ theme, isActive }) => (isActive ? theme.text2 : theme.text3)};
  }
  margin-top: 0.5px;
`
