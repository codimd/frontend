import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { ShowIf } from '../../../common/show-if/show-if'
import './mermaid.scss'

export interface MermaidChartProps {
  code: string
}

interface MermaidParseError {
  str: string
}

let mermaidInitialized = false

export const MermaidChart: React.FC<MermaidChartProps> = ({ code }) => {
  const diagramContainer = useRef<HTMLDivElement>(null)
  const [error, setErrorState] = useState<string>()
  const { t } = useTranslation()

  const setError = useCallback((error: string|undefined) => {
    if (error !== undefined) {
      console.error(error)
    }
    setErrorState(error)
  }, [])

  useEffect(() => {
    if (!mermaidInitialized) {
      import('mermaid').then((mermaid) => {
        mermaid.default.initialize({ startOnLoad: false })
        mermaidInitialized = true
      }).catch(() => { console.error('error while loading mermaid') })
    }
  }, [])

  const showError = useCallback((error: string) => {
    if (!diagramContainer.current) {
      return
    }
    setError(error)
    console.error(error)
    diagramContainer.current.querySelectorAll('svg').forEach(child => child.remove())
  }, [])

  useEffect(() => {
    if (!diagramContainer.current) {
      return
    }
    try {
      import('mermaid').then((mermaid) => {
        if (!diagramContainer.current) {
          return
        }
        mermaid.default.parse(code)
        delete diagramContainer.current.dataset.processed
        diagramContainer.current.textContent = code
        mermaid.default.init(diagramContainer.current)
        setError(undefined)
      }).catch(() => setError('Error while loading mermaid'))
    } catch (error) {
      const message = (error as MermaidParseError).str
      showError(message || t('renderer.mermaid.unknownError'))
    }
  }, [code, showError, t])

  return <Fragment>
    <ShowIf condition={!!error}>
      <Alert variant={'warning'}>{error}</Alert>
    </ShowIf>
    <div className={'text-center mermaid text-black'} ref={diagramContainer}/>
  </Fragment>
}
