import { CValue } from './reducer'

export function formatCValue(value: CValue): string {
  return parseFloat(value.value).toFixed(5)
}
