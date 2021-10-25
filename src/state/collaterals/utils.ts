import { CValue } from './reducer'

export function cValue(value: CValue): number {
  return Number(parseFloat(value.value).toFixed(5))
}
