import type { tMapReducer } from './types'

export const mapReducer = (state: tMapReducer['state'], action: tMapReducer['action']) => {
  if (action.type) {
    switch (action.type) {
      case 'selected':
        return {
          ...state,
        }
      case 'set-boundaries':
        const rect = document.querySelector('#worldMap')?.getBoundingClientRect()
        if (!rect) return state
        if (-rect.right + rect.left + window.innerWidth != state.boundaries.left) {
          return {
            ...state,
            boundaries: {
              top: -5,
              bottom: 0,
              left: -rect.right + rect.left + window.innerWidth,
              right: 0,
            },
          }
        }
        return state
      case 'visitCookie':
        return {
          ...state,
          hasVisited: false,
        }
      case 'countryHover':
        return {
          ...state,
          hovered: action.details as string,
        }
      case 'clearHover':
        return {
          ...state,
          hovered: null,
        }
      case 'dragStart':
        return {
          ...state,
          dragging: {
            first: true,
            current: true,
          },
        }
      case 'dragEnd':
        return {
          ...state,
          dragging: {
            first: true,
            current: false,
          },
        }
      case 'setDragging':
        return {
          ...state,
          dragging: action.details,
        }
    }
  }

  return state
}
