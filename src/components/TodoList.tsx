import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import styles from './TodoList.module.css'

interface Task {
  id: string
  description: string
  completed: boolean
}

export function TodoList() {
  const [newTaskText, setNewTaskText] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const newTask = {
      id: '',
      description: newTaskText,
      completed: false,
    }

    setTasks([...tasks, newTask])
    setNewTaskText('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTaskText(event.target.value)
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  return (
    <main className={styles.container}>
      <div className={styles.newTask}>
        <form className={styles.newTaskForm} onSubmit={handleCreateNewTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTaskText}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
          />
          <button>Criar</button>
        </form>
      </div>
      <div className={styles.taskList}>
        <div className={styles.taskListStatus}>
          <span>Tarefas Criadas</span>
          <span>Tarefas Concluídas</span>
        </div>
        <div></div>
      </div>
    </main>
  )
}
