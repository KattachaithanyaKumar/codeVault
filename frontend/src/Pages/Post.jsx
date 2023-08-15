import React, {useState, useEffect} from 'react'
import BlockContent from "@sanity/block-content-to-react"
import { client, urlFor } from '../../client';
import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Masonry from 'react-masonry-css'
import Navbar from '../components/Navbar';
import { CodeBlock, dracula } from "react-code-blocks";
import Footer from '../components/Footer';

const CodeBlocks = ({ node }) => {
  if (!node || !node.code) {
    return null;
  }
  return (
    <div className="codeBlock">
      <CodeBlock
        text={node.code}
        language={node.language}
        showLineNumbers={false}
        theme={dracula}
      />
      <br />
    </div>
  );
};

const serializers = {
  types: {
    code: CodeBlocks, // Use the custom serializer for the "code" block type
    block: props => {
        if (props.node.style === 'normal') {
          return <p>{props.children}</p>; // Render paragraphs
        }
        if (props.node.style === 'h1') {
          return <h1><br />{props.children}<br /> <br /></h1>; // Render h1
        }
        if (props.node.style === 'h2') {
          return <h2><br />{props.children}</h2>; // Render h3
        }
        if (props.node.style === 'blockquote') {
          return <blockquote className='quote'>{props.children}</blockquote>; // Render blockquotes
        }
        return <p>{props.children}</p>;
      },
  },
};

const spinnerColor = "#000";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 80,
      color: spinnerColor,      
    }}
    spin
  />
);

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  800: 1,
  500: 1
};

const Post = () => {
  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState(null);

  const { slug } = useParams();
  // console.log(slug);

  useEffect(() => {
    client
    .fetch('*[_type == "blogPost" && slug.current == $slug][0]', {
      slug: slug,
    })
    .then((data) => {
      // console.log("data: ", data);
      setBlog(data)
    })
    .catch((err) => console.error(err))


    client.fetch('*[_type == "author"][0]')
    .then((data) => {
      // console.log("author: ", data);
      setAuthor(data);
    })
    .catch((err) => console.error(err))
  }, [slug])

  if (!blog || !author) {
    return <div className="center">
      <Spin indicator={antIcon} />
    </div>
  }

  return (
    <div className='post'>
      <Navbar />
      <div className="scrollbutton">
        <button 
          className='shadow'
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}
        >Top</button>
      </div>
      <div className="post-page">
        <div className="post-container shadow">
          <img src={urlFor(blog.banner.asset._ref)} alt="" />
          <h1>{blog.title}</h1>
          <p>{blog.publishedAt}</p>
          <div className="blog-content">
            <BlockContent
              blocks={blog.content}
              projectId="2oxqalq0"
              dataset="production"
              serializers={serializers}
            />
          </div>
        </div>

        <div className="profile-block shadow">
          <img src={urlFor(author?.image.asset._ref)} alt="" />
          <div className="profile-info">
            <h2>{author?.name}</h2>
            <BlockContent
              blocks={author.bio}
              projectId="2oxqalq0"
              dataset="production"
              serializers={serializers}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Post

{/* <img src={urlFor(blog.banner.asset._ref)} alt="" />
      <h1>{blog.title}</h1>
      <p>{blog.excerpt}</p>
      <BlockContent
        blocks={blog.content}
        projectId="2oxqalq0"
        dataset="production"
        serializers={serializers}
      /> */}