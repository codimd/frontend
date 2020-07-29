import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import './application-loader.scss'
import { createSetUpTaskList, InitTask } from './initializers'

import { LoadingScreen } from './loading-screen'

export const ApplicationLoader: React.FC = ({ children }) => {
  const { pathname } = useLocation()

  const setUpTasks = useCallback(() => {
    const baseUrl: string = window.location.protocol + '//' + window.location.host.replace(pathname, '')
    return createSetUpTaskList(baseUrl)
  }, [pathname])

  const [failedTitle, setFailedTitle] = useState<string>('')
  const [doneTasks, setDoneTasks] = useState<number>(0)
  const [initTasks] = useState<InitTask[]>(setUpTasks)

  const runTask = useCallback(async (task: Promise<void>): Promise<void> => {
    await task
    setDoneTasks(prevDoneTasks => {
      return prevDoneTasks + 1
    })
  }, [])

  useEffect(() => {
    for (const task of initTasks) {
      runTask(task.task).catch((reason: Error) => {
        console.error(reason)
        setFailedTitle(task.name)
      })
    }
  }, [initTasks, runTask])

  return (
    doneTasks < initTasks.length || initTasks.length === 0
      ? <LoadingScreen failedTitle={failedTitle}/>
      : <Fragment>{children}</Fragment>
  )
}
