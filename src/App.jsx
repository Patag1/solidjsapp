import styles from './App.module.css'
import { createSignal, onMount } from 'solid-js'

function App() {
  const [todos, setTodos] = createSignal([])
  let todoText

  onMount(() => {
    const existingTodos = localStorage.getItem('todos')
    setTodos(existingTodos ? JSON.parse(existingTodos) : [])
  })

  function addTodo(e) {
    e.preventDefault()
    if (todoText.value === '') return alert('Not a valid task!')
    const next = [...todos(), todoText.value]
    setTodos(next)
    localStorage.setItem('todos', JSON.stringify(next))
  }

  function removeTodo(todo) {
    const next = todos().filter((t) => t !== todo)
    setTodos(next)
    localStorage.setItem('todos', JSON.stringify(next))
  }

  return (
    <div class={styles.App}>
      <h1 class={styles.h1}>First look at Solid.js!</h1>

      <ul class={styles.ul}>
        {todos().map((todo, i) => (
          <li class={styles.li} onClick={() => removeTodo(todo)} key={i}>
            <p>
              <span class={styles.i}>{i + 1}</span>{' '}
              {todo}
            </p>
          </li>
        ))}
      </ul>

      <form class={styles.form} onSubmit={addTodo}>
        <input class={styles.input} type="text" ref={todoText} />
        <input class={styles.submit} type="submit" value="Add Todo" />
      </form>
    </div>
  )
}

export default App
