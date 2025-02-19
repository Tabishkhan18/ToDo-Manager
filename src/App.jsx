import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {

    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }


  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="md:container mx-3 md:mx-auto my-5 rounded-2xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-2xl'>Manage Your Tasks At One Place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <div className="flex">

            <input onChange={handleChange} value={todo} type="text" placeholder='Enter Task' className='w-full rounded-lg p-2' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 hover:bg-violet-950 text-white p-4 py-1 rounded-md mx-6 text-sm font-bold disabled:bg-violet-400'>Add</button>
          </div>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="" /> Show Finished
        <h2 className="font-bold text-lg">Your Tasks</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Tasks to display</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-full md:w-3/4 my-3 justify-between">
              <div className="flex gap-5">
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>

              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 text-white p-4 py-2 rounded-md mx-2 text-sm font-bold'><AiFillEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 text-white p-4 py-2 rounded-md mx-2 text-sm font-bold'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
      <Footer />
    </>

  )
}

export default App