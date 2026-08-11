import '@fortawesome/fontawesome-free/css/all.css'
import keyBy from 'lodash/keyBy'
import { useMemo, useState } from 'react'

import * as config from './config'
import './App.css';
import { DefinitionsContext } from './providers'
import { loadKeycodes, normalizeZmkKeycodes } from './keycodes'
import { loadBehaviours } from './api'
import KeyboardPicker from './Pickers/KeyboardPicker';
import Selector from './Common/Selector'
import Spinner from './Common/Spinner';
import Keyboard from './Keyboard/Keyboard'
import GitHubLink from './GitHubLink'
import Loader from './Common/Loader'
import github from './Pickers/Github/api'

const legendChoices = [
  { id: 'us', name: 'US' },
  { id: 'jis', name: 'JIS' }
]

const storedLegend = localStorage.getItem('legendLocale')
const defaultLegend = legendChoices.find(choice => choice.id === storedLegend)
  ? storedLegend
  : 'us'

function App() {
  const [rawDefinitions, setRawDefinitions] = useState(null)
  const [legend, setLegend] = useState(defaultLegend)
  const [source, setSource] = useState(null)
  const [sourceOther, setSourceOther] = useState(null)
  const [layout, setLayout] = useState(null)
  const [keymap, setKeymap] = useState(null)
  const [editingKeymap, setEditingKeymap] = useState(null)
  const [saving, setSaving] = useState(false)

  function handleCompile() {
    fetch(`${config.apiBaseUrl}/keymap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editingKeymap || keymap)
    })
  }

  const handleCommitChanges = useMemo(() => function() {
    const { repository, branch } = sourceOther.github

    ;(async function () {
      setSaving(true)
      await github.commitChanges(repository, branch, layout, editingKeymap)
      setSaving(false)

      setKeymap(editingKeymap)
      setEditingKeymap(null)
    })()
  }, [
    layout,
    editingKeymap,
    sourceOther,
    setSaving,
    setKeymap,
    setEditingKeymap
  ])

  const handleKeyboardSelected = useMemo(() => function(event) {
    const { source, layout, keymap, ...other } = event

    setSource(source)
    setSourceOther(other)
    setLayout(layout)
    setKeymap(keymap)
    setEditingKeymap(null)
  }, [
    setSource,
    setSourceOther,
    setLayout,
    setKeymap,
    setEditingKeymap
  ])

  const initialize = useMemo(() => {
    return async function () {
      const [keycodes, behaviours] = await Promise.all([
        loadKeycodes(),
        loadBehaviours()
      ])

      setRawDefinitions({ keycodes, behaviours })
    }
  }, [setRawDefinitions])

  const definitions = useMemo(() => {
    if (!rawDefinitions) {
      return null
    }

    const keycodes = normalizeZmkKeycodes(rawDefinitions.keycodes, legend)
    const behaviours = [...rawDefinitions.behaviours]

    keycodes.indexed = keyBy(keycodes, 'code')
    behaviours.indexed = keyBy(behaviours, 'code')

    return { keycodes, behaviours }
  }, [rawDefinitions, legend])

  const handleUpdateKeymap = useMemo(() => function(keymap) {
    setEditingKeymap(keymap)
  }, [setEditingKeymap])

  return (
    <>
      <Loader load={initialize}>
        <KeyboardPicker onSelect={handleKeyboardSelected}>
          <Selector
            id="legend"
            label="Legend"
            value={legend}
            choices={legendChoices}
            onUpdate={value => {
              localStorage.setItem('legendLocale', value)
              setLegend(value)
            }}
          />
        </KeyboardPicker>
        <div id="actions">
          {source === 'local' && (
            <button disabled={!editingKeymap} onClick={handleCompile}>
              Save Local
            </button>
          )}
          {source === 'github' && (
            <button
              title="Commit keymap changes to GitHub repository"
              disabled={!editingKeymap}
              onClick={handleCommitChanges}
            >
              {saving ? 'Saving' : 'Commit Changes'}
              {saving && <Spinner />}
            </button>
          )}
        </div>
        <DefinitionsContext.Provider value={definitions}>
          {layout && keymap && (
            <Keyboard
              layout={layout}
              keymap={editingKeymap || keymap}
              onUpdate={handleUpdateKeymap}
            />
          )}
        </DefinitionsContext.Provider>
      </Loader>
      <GitHubLink className="github-link" />
    </>
  );
}

export default App;
