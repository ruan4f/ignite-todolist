import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './TodoList.module.css'

interface Task {
  id: string
  description: string
}

export function TodoList() {
  const [newTaskText, setNewTaskText] = useState('')
  const [tasks, setTasks] = useState<Task[]>()

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const newTask = {
      id: '',
      description: newTaskText,
    }

    setTasks([...tasks, newTask])
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewTaskText(event.target.value)
  }

  return (
    <main className={styles.container}>
      <div className={styles.newTask}>
        <form onSubmit={handleCreateNewTask}>
          <input type="text" />
          <button>Criar</button>
        </form>
      </div>
    </main>
  )
}
