import React from "react";
import { Link } from "react-router-dom";
import Slider1 from "../../img/Slider-1.jpg";
import Slider2 from "../../img/Slider-2.jpg";
import Slider3 from "../../img/Slider-3.jpg";
import About from "../../img/About.jpg";
import Service from "../../img/Service.jpg";
import Contact from "../../img/Contact.jpg";
import News from "../../img/News.jpg";
import Currency from "../../img/Currency.jpg";
import ChatIA from "../../img/ChatIA.png";



export const Body = () => {
    return (
        <main>
            {/*Carousel*/}
            <div id="carouselExampleCaptions" class="carousel slide">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src={Slider1} class="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Do you have a project in mind?</h5>
                            <p>We will help you with our AI chat</p>
                            <Link to="/login">
                                <button type="button" class="btn btn-info btn-lg">LogIn</button>
                            </Link>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src={Slider2} class="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <h5>AI will give you the best ideas</h5>
                            <p>Choose a budget for your project, we will give you several ideas for your business</p>
                            <Link to="/login">
                                <button type="button" class="btn btn-info btn-lg">LogIn</button>
                            </Link>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src={Slider3} class="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <h5>The power of AI in your hands</h5>
                            <p>With AI and your answers we will customize the project that best suits you</p>
                            <Link to="/login">
                                <button type="button" class="btn btn-info btn-lg">LogIn</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>


            {/*Info*/}
            <div className="container marketing">
                <div className="text-center py-3">
                    <h1>We bring your projects and ideas to </h1>
                    <h1>life with artificial intelligence</h1>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <img src={About} className="w-50" alt="..." />
                        <h2 className="fw-normal text-start">About Us</h2>
                        <p>We have a multidisciplinary team with years of experience in the field, each project is unique. We work with you to create personalized solutions.</p>
                        <p><a className="btn btn-secondary" href="#">View details »</a></p>
                    </div>
                    <div className="col-lg-4">
                        <img src={Service} className="w-50" alt="" />
                        <h2 className="fw-normal">Service</h2>
                        <p>We offer a variety of services tailored to specific project needs. Through our chat you can have ideas for ventures immediately.</p>
                        <p><a className="btn btn-secondary" href="#">View details »</a></p>
                    </div>
                    <div className="col-lg-4">
                        <img src={Contact} className="w-50" alt="" />
                        <h2 className="fw-normal text-start">Contact</h2>
                        <p>Ready to take your project to the next level? Sign up and start using AI for free to get project ideas.
                        </p>
                        <p><a className="btn btn-secondary" href="#">View details »</a></p>
                    </div>
                </div>


                {/*Sections*/}
                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1">Stay up to date</h2>
                        <p className="lead">Always updated with the latest news.</p>
                        <Link to="/news">
                                <button type="button" class="btn btn-info btn-lg">News</button>
                        </Link>
                    </div>
                    <div className="col-md-5">
                        <img src={News} alt="" />
                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading fw-normal lh-1">Chat with artificial intelligence</h2>
                        <p className="lead">Use our artificial intelligence chat to bring your projects to life.</p>
                        <Link to="/advisor">
                                <button type="button" class="btn btn-info btn-lg">ChatIA</button>
                        </Link>
                    </div>
                    <div className="col-md-5">
                        <img src={ChatIA} alt="" />
                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1">Currency converter</h2>
                        <p className="lead">Use the currency converter so you can calculate your budgets in different countries</p>
                        <Link to="/">
                                <button type="button" class="btn btn-info btn-lg">Converter</button>
                        </Link>
                    </div>
                    <div className="col-md-5 order-md-1">
                        <img src={Currency} alt="" />
                    </div>
                </div>

                <hr className="featurette-divider" />

            </div>
        </main>
    );
};