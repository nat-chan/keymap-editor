import * as api from './api'
import { JIS_LEGENDS } from './jis'

export function loadBehaviours () {
  return api.loadBehaviours()
}

export function loadKeycodes () {
  return api.loadKeycodes()
}

function shortestAlias (aliases) {
  return [...aliases]
    .sort((a, b) => a.length - b.length)[0]
    .replace(/^KC_/, '')
}

export function normalizeZmkKeycodes (keycodes, locale = 'us') {
  const fnPattern = /^(.+?)\((code)\)$/

  return keycodes.reduce((keycodes, keycode) => {
    const { context, faIcon } = keycode
    let { description, symbol } = keycode
    const aliases = keycode.names.filter(name => !name.match(fnPattern))
    const fnCode = keycode.names.map(name => name.match(fnPattern)).filter(v => !!v)[0]

    const jis = locale === 'jis' ? JIS_LEGENDS[keycode.names[0]] : null
    if (jis) {
      symbol = jis.symbol
      description = jis.description + (description ? ` — US: ${description}` : '')
    }

    const base = {
      aliases,
      description,
      context,
      // a JIS legend must not be hidden behind a font-awesome icon
      faIcon: jis ? undefined : faIcon,
      symbol: symbol || shortestAlias(aliases),
      params: []
    }

    for (let code of aliases) {
      keycodes.push(Object.assign({}, base, {
        code,
        isModifier: !!fnCode
      }))
    }

    if (fnCode) {
      keycodes.push(Object.assign({}, base, {
        code: fnCode[1],
        params: fnCode[2].split(',')
      }))
    }

    return keycodes
  }, [])
}
