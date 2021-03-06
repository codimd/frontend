/*
 SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)

 SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo } from 'react'
import { parseCsv } from './csv-parser'

export interface CsvTableProps {
  code: string
  delimiter: string
  showHeader: boolean
  tableRowClassName?: string
  tableColumnClassName?: string
}

export const CsvTable: React.FC<CsvTableProps> = ({
  code,
  delimiter,
  showHeader,
  tableRowClassName,
  tableColumnClassName
}) => {
  const { rowsWithColumns, headerRow } = useMemo(() => {
    const rowsWithColumns = parseCsv(code.trim(), delimiter)
    let headerRow: string[] = []
    if (showHeader) {
      headerRow = rowsWithColumns.splice(0, 1)[0]
    }
    return { rowsWithColumns, headerRow }
  }, [code, delimiter, showHeader])

  const renderTableHeader = (row: string[]) => {
    if (row !== []) {
      return (
        <thead>
          <tr>
            {row.map((column, columnNumber) => (
              <th key={`header-${columnNumber}`}>{column}</th>
            ))}
          </tr>
        </thead>
      )
    }
  }

  const renderTableBody = (rows: string[][]) => {
    return (
      <tbody>
        {rows.map((row, rowNumber) => (
          <tr className={tableRowClassName} key={`row-${rowNumber}`}>
            {row.map((column, columnIndex) => (
              <td className={tableColumnClassName} key={`cell-${rowNumber}-${columnIndex}`}>
                {column.replace(/^"|"$/g, '')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    )
  }

  return (
    <table className={'csv-html-table table-striped'}>
      {renderTableHeader(headerRow)}
      {renderTableBody(rowsWithColumns)}
    </table>
  )
}
