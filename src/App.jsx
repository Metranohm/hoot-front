// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// Page components
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Logout from './pages/Logout/Logout'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import BlogList from './pages/BlogList/BlogList'
import BlogDetails from './pages/BlogDetails/BlogDetails'
import NewBlog from "./pages/NewBlog/NewBlog"
import EditBlog from './pages/EditBlog/EditBlog'

// Components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// Services
import * as authService from './services/authService'
import * as blogService from './services/blogService'

const App = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(authService.getUser())
  const [blogs, setBlogs] = useState([])

  const handleLogout = () => {
    setUser(null)
    authService.logout()
    navigate('/logout')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  const handleAddBlog = async (blogData) => {
    // blogData will have a shape of:
    //   {
    //     "title": "string",
    //     "category": "string",
    //     "text": "string"
    //   }
    const newBlog = await blogService.create(blogData)
    setBlogs([newBlog, ...blogs])
    navigate('/blogs')
  }

  const handleUpdateBlog = async (blogData) => {
    // blogData._id will be 634daa34dc0dfecfbb5767de
    const updatedBlog = await blogService.update(blogData)
    const updatedBlogsData = blogs.map(blog => {
      return blogData._id === blog._id ? updatedBlog : blog
    })
    setBlogs(updatedBlogsData)
    navigate('/blogs')
  }

  const handleDeleteBlog = async (id) => {
    const deletedBlog = await blogService.deleteBlog(id)
    setBlogs(blogs.filter(b => b._id !== deletedBlog._id))
    navigate('/blogs')
  }
  
  useEffect(() => {
    console.log("The useEffect is running");
    const fetchAllBlogs = async () => {
      console.log('The Fetch All Blogs function is running')
      const data = await blogService.index()
      setBlogs(data)
    }
    if (user) fetchAllBlogs()
  }, [user])

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login handleSignupOrLogin={handleSignupOrLogin} />} />
        <Route path="/signup" element={<Signup handleSignupOrLogin={handleSignupOrLogin} />} />

        <Route
          path="/blogs"
          element={
            <ProtectedRoute user={user}>
              <BlogList blogs={blogs}/>
            </ProtectedRoute>
          }
        />

        <Route 
          path="/blogs/:id"
          element={
            <ProtectedRoute user={user}>
              <BlogDetails 
                user={user} 
                handleDeleteBlog={handleDeleteBlog} 
              />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/blogs/new"
          element={
            <ProtectedRoute user={user}>
              <NewBlog handleAddBlog={handleAddBlog} />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/blogs/:id/edit"
          element={
            <ProtectedRoute user={user}>
              <EditBlog handleUpdateBlog={handleUpdateBlog} />
            </ProtectedRoute>
          }
        />

        <Route path="/profiles" element={
          <ProtectedRoute user={user}>
            <Profiles />
          </ProtectedRoute>
        } />

        <Route path="/changePassword" element={
          <ProtectedRoute user={user}>
            <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App