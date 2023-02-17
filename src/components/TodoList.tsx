import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Check, ClipboardText, Trash, PlusCircle } from 'phosphor-react'

import styles from './TodoList.module.css'

interface Task {
  id: string
  description: string
  isComplete: boolean
}

export function TodoList() {
  const [newTaskText, setNewTaskText] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const newTask = {
      id: uuid(),
      description: newTaskText,
      isComplete: false,
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

  function handleTaskComplete(id: string) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.isComplete = !task.isComplete
        }
        return task
      }),
    )
  }

  function handleTaskDelete(id: string) {
    setTasks(
      tasks.filter((task) => {
        return task.id !== id
      }),
    )
  }

  const taskCount = tasks.length
  const taskCompleteCount = tasks.filter((task) => {
    return task.isComplete
  }).length

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
          <button type="submit">
            Criar <PlusCircle />
          </button>
        </form>
      </div>

      <div className={styles.stats}>
        <p>
          Tarefas criadas <span>{taskCount}</span>
        </p>
        <p>
          Concluídas{' '}
          {taskCount > 0 ? (
            <span>
              {taskCompleteCount} de {taskCount}
            </span>
          ) : (
            <span>{taskCount}</span>
          )}
        </p>
      </div>
      {taskCount > 0 ? (
        <ul className={styles.list}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.task}>
              <button
                onClick={() => handleTaskComplete(task.id)}
                className={
                  task.isComplete ? styles.btnComplete : styles.btnIncomplete
                }
              >
                <Check weight="bold" />
              </button>
              <span
                className={
                  task.isComplete ? styles.taskComplete : styles.taskIncomplete
                }
              >
                {task.description}
              </span>
              <button
                onClick={() => handleTaskDelete(task.id)}
                className={styles.btnDelete}
              >
                <Trash weight="light" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.emptyList}>
          <ClipboardText weight="light" />
          <p>
            <strong>Você ainda não tem tarefas cadastradas</strong> <br />
            Crie tarefas e organize seus itens a fazer
          </p>
        </div>
      )}
    </main>
  )
}
