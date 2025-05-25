import React, { useEffect, useState } from "react";
import "../Home/Home.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../layouts/Fouter/Fouter";
import Header from "../../layouts/Header/Header"
import myPic from "../../assets/images/my-pic.jpeg"
import youtubeIcon from "../../assets/images/icons8-youtube (1).svg"
import githubIcon from "../../assets/images/github-icon.svg"
import linkedinIcon from "../../assets/images/linkedin-icon.svg"
import telegramIcon from "../../assets/images/telegram-icon.svg"
import { Link } from "react-router-dom";

 function Home(props) {
  
  return (
    <div>
      {/* <Header></Header> */}
          <section className="main-section">
            <div className="container">
            <div className="main-up">
              <div className="left">
                  <img style={{borderRadius: "50%"}} src={myPic} alt="my_pic" width={140} height={140}/>
              </div>
              <div className="right">
                  <p style={{fontSize:"45px",fontFamily:"sansbold", color:" rgba(0, 0, 0, 0.85)",marginBottom:0}}>Akmal Khakimov</p>
                  <p style={{fontSize:"31.5px",fontFamily:"sansregular", opacity:"50%"}}>Software Engineer</p>
                  <div className="links">
                    <Link to={"https://youtube.com"} target="_blank"><img width={27} height={27} src={youtubeIcon} alt="" /></Link>
                    <img width={25} height={25} src={githubIcon} alt="" />
                    <img width={20} height={20} src={linkedinIcon} alt="" />
                    <img width={22} height={22} src={telegramIcon} alt="" />
                  </div>
              </div>
            </div>

            <div className="main-down">
              <p style={{fontSize: "20px",fontFamily:"sansregular",}}>I write about non-technical stuff in the technical world.</p>
              <button className="btn btn-primary">Read Blog</button>
              <button className="btn btn-outline-primary" style={{marginLeft:"10px"}}>About Me</button>
            </div>
            </div>
          </section>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default Home;
