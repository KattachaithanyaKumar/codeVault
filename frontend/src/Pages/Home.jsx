import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import {client, urlFor} from '../../client';
import Masonry from 'react-masonry-css'
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  800: 1,
  500: 1
};

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    client.fetch(`*[_type == "blogPost"]`)
    .then((data) => {
      console.log(data)
      setBlogs(data);
    })
    .catch((err) => console.error(err))
  }, [])


  return (
    <div className='home'>
      <Navbar option1 />

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid rise"
        columnClassName="my-masonry-grid_column"
      >
        {blogs?.map((blog) => (
          <div 
            className="blog shadow" 
            key={blog?._id}
            onClick={() => navigate(`/post/${blog?.slug.current}`)}
          >
            <h4>{blog.publishedAt}</h4>
            <img src={urlFor(blog?.banner)} alt="banner" />
            <h1>{blog.title}</h1>
            <p>
              {blog.excerpt}
              {/* <div className="rect"></div> */}
            </p>
          </div>
        ))}
      </Masonry>

      <Footer />
    </div>
  )
}

export default Home