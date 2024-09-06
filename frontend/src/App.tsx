import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Signup from './pages/Signup'
import Blogs from './pages/Blogs'
import Signin from './pages/Signin'
import ViewBlog from './pages/ViewBlog'
import Publish from './pages/Publish'
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signin/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/signin' element={<Signin/>}></Route>
      <Route path='/blogs' element={<Blogs/>}></Route>
      <Route path='/blogs/:id' element={<ViewBlog/>}></Route>
      <Route path='/publish' element={<Publish/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
