import { Link } from "react-router-dom";
import styles from './BlogCard.module.css'

// Components
import Icon from "../Icon/Icon"
import AuthorInfo from "../AuthorInfo/AuthorInfo"

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog._id}`}>
      <article className={styles.container}>
        <header>
          <span>
            <h1>{blog.title}</h1>
            <Icon category={blog.category} />
          </span>
          <AuthorInfo content={blog} />
        </header>
        <p>{blog.text}</p>
      </article>
    </Link>
  )
}

export default BlogCard