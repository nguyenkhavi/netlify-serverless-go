//TYPES MODULES
import type { KeyboardEvent } from 'react'

export function enterNumberOnly(event: KeyboardEvent<HTMLInputElement>) {
  // Check backspace
  if (
    ['Backspace', 'Deleted'].includes(event.key) ||
    (event.ctrlKey && ['a', 'c', 'v', 'x'].includes(event.key)) ||
    (event.metaKey && ['a', 'c', 'v', 'x'].includes(event.key))
  ) {
    return;
  }

  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
}
