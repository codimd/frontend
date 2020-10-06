import React, { useCallback, useEffect } from 'react'

export const useExtractFirstHeadline = (documentElement: React.RefObject<HTMLDivElement>, onFirstHeadingChange?: (firstHeading: string | undefined) => void) => {
  const extractInnerText = useCallback((node: ChildNode): string => {
    let innerText = ''
    if (node.childNodes && node.childNodes.length > 0) {
      node.childNodes.forEach((child) => { innerText += extractInnerText(child) })
    } else if (node.nodeName === 'IMG') {
      innerText += (node as HTMLImageElement).getAttribute('alt')
    } else {
      innerText += node.textContent
    }
    return innerText
  }, [])

  useEffect(() => {
    if (onFirstHeadingChange && documentElement.current) {
      const firstHeading = documentElement.current.getElementsByTagName('h1').item(0)
      if (firstHeading) {
        onFirstHeadingChange(extractInnerText(firstHeading))
      }
    }
  }, [documentElement, extractInnerText, onFirstHeadingChange])
}
