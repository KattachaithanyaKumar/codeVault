import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { client, urlFor } from '../../client'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import img from "../assets/Group 1.png"
import Footer from '../components/Footer';

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


const About = () => {
  const [author, setAuthor] = useState(null);
  const [links, setLinks] = useState(null);

  useEffect(() => {
    client
    .fetch(`*[_type == "author"]`)
    .then((data) => {
      // console.log(typeof data[0].image.asset._ref);
      console.log("bio: ", data[0].bio[0]);
      setAuthor(data[0]);
    })
    .catch((err) => console.error(err));


    client
    .fetch(`*[_type == "socials"]`)
    .then((data) => {
      // console.log(data);
      setLinks(data);
    })
    .catch((err) => console.error(err));
  }, [])

  if (!author || !links)  {
    return <div className="center">
      <Spin indicator={antIcon} />
      {/* <h1>Lodaing...</h1> */}
    </div>
  }

  return (
    <div className='about'>
      <Navbar option2 />

      <div className="about-page rise">
        <div className="about-container">
          <div className="about-img">
            <img src={urlFor(author.image.asset._ref)} alt="" />
            <div className="about-circle">
              <img src={img} alt="" />
            </div>
          </div>
          <div className="about-info">
            <div className="about-text">
              <h1>WHO AM I?</h1> 
              <p>{author?.bio[0].children[0].text}</p>
            </div>
            <div className="about-links">
              {links.map((link) => (
                <a className="link" key={link._id} href={link.url} target='_blank'> 
                  <img src={urlFor(link.icon.asset._ref)} alt="" />
                  <h5>{link.name}</h5>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default About