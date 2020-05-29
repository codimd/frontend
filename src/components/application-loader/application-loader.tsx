import React, { Fragment, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { setUp } from '../../initializers'
import './application-loader.scss'
import { InitTask } from '../../initializers'
import { LoadingScreen } from './loading-screen'

interface ApplicationLoaderProps {
  initTasks: InitTask[]
}

export const ApplicationLoader: React.FC<ApplicationLoaderProps> = ({ children, initTasks }) => {
  const [failedTitle, setFailedTitle] = useState<string>('')
  const [doneTasks, setDoneTasks] = useState<number>(0)
  const [initTasks, setInitTasks] = useState<Promise<void>[]>([])
  const { pathname } = useLocation()

  const runTask = async (task: Promise<void>): Promise<void> => {
    await task
    setDoneTasks(prevDoneTasks => {
      return prevDoneTasks + 1
    })
  }

  useEffect(() => {
    const baseUrl:string = window.location.pathname.replace(pathname, '') + '/'
    console.debug('Base URL is', baseUrl)
    setInitTasks(setUp(baseUrl))
  }, [pathname])

  useEffect(() => {
    for (const task of initTasks) {
      runTask(task.task).catch((reason: Error) => {
        console.error(reason)
        setFailedTitle(task.name)
      })
    }
  }, [initTasks])

  return (
    doneTasks < initTasks.length || initTasks.length === 0
      ? <LoadingScreen failedTitle={failedTitle}/>
      : <Fragment>{children}</Fragment>
  )
}
