import * as config from './config'
import bundledBehaviours from './data/zmk-behaviors.json'
import bundledKeycodes from './data/zmk-keycodes.json'

export function healthcheck() {
  return fetch(`${config.apiBaseUrl}/health`)
}

// Keycode/behaviour definitions are static ZMK metadata. Fall back to the
// bundled copies so the editor UI can load without a running API server.
export function loadBehaviours() {
  return fetch(`${config.apiBaseUrl}/behaviors`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`API /behaviors returned ${response.status}`)
      }
      return response.json()
    })
    .catch(() => bundledBehaviours)
}

export function loadKeycodes() {
  return fetch(`${config.apiBaseUrl}/keycodes`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`API /keycodes returned ${response.status}`)
      }
      return response.json()
    })
    .catch(() => bundledKeycodes)
}

export function loadKeymap() {
  return fetch(`${config.apiBaseUrl}/keymap`)
    .then(response => response.json())
}

export function loadLayout() {
  return fetch(`${config.apiBaseUrl}/layout`)
    .then(response => response.json())
}
