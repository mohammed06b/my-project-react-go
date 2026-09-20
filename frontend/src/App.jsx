import { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [newTask, setNewTask] = useState('')

  // دالة لجلب المهام من السيرفر
  const fetchTodos = () => {
    fetch('http://localhost:8080/api/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data || []))
      .catch((err) => console.error(err))
  }

  // تجلب المهام أول ما تفتح الصفحة
  useEffect(() => {
    fetchTodos()
  }, [])

  // دالة لإضافة مهمة جديدة
  const handleAdd = () => {
    if (newTask.trim() === '') return

    fetch('http://localhost:8080/api/todos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTask }),
    })
      .then(() => {
        setNewTask('') // نفضي حقل الإدخال
        fetchTodos() // نحدّث القائمة
      })
      .catch((err) => console.error(err))
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>قائمة المهام</h1>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="اكتب مهمة جديدة"
      />
      <button onClick={handleAdd}>إضافة</button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  )
}

export default App