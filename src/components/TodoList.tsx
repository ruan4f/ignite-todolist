import styles from './TodoList.module.css'

export function TodoList() {
  return (
    <main className={styles.container}>
      <div className={styles.newTask}>
        <input type="text" />
        <button>Criar</button>
      </div>
    </main>
  )
}
