import React, { useState } from 'react'
import Navbar from '../components/Navbar'

const Admin = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle the submission of the blog post to Sanity.io or store it locally.
  };

  const handleImage = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className='admin'>
      <Navbar option4 />

      <div className="admin-container rise">
        <div className='admin-add shadow'>
          <h1>Write Your Blog Post</h1>
          <form onSubmit={handleSubmit}>
            <label>Banner</label>
            {file && <img src={file} alt="Upload Image" className={"file-uploaded"} />}
            <input type="file" onChange={handleImage} />
            <label>Title</label>
            <input type="text" placeholder='Enter the title' value={title} onChange={handleTitleChange} />
            <label>Content</label>
            <textarea value={content} onChange={handleContentChange} />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Admin