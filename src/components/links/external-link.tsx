import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '../../utils/iconProp'

export interface ExternalLinkProp {
  href: string;
  icon?: IconProp;
  className?: string
}

export interface ExternalLinkTextProp {
  text: string;
}

export const ExternalLink: React.FC<ExternalLinkProp & ExternalLinkTextProp> = ({ href, text, icon, className = 'text-light' }) => {
  return (
    <a href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}>
      {
        icon
          ? <Fragment>
            <FontAwesomeIcon icon={icon} fixedWidth={true}/>&nbsp;
          </Fragment>
          : null
      }
      {text}
    </a>
  )
}
