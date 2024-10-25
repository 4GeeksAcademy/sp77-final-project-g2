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
import Corporation from "../../img/Corporation.jpg"
import ChatIA from "../../img/ChatIA.png";
import "../../styles/Body.css";

const testimonialsData = [
    {
        name: "John Doe",
        position: "CEO of ExampleCorp",
        testimonial: "This service transformed our business! The AI ideas provided were game-changers.",
        image: "https://randomuser.me/api/portraits/men/78.jpg",
    },
    {
        name: "Jane Smith",
        position: "Founder of Creative Solutions",
        testimonial: "The team was incredibly supportive and helped us generate innovative ideas.",
        image: "https://randomuser.me/api/portraits/women/49.jpg",
    },
    {
        name: "Michael Brown",
        position: "Marketing Director at Tech Innovations",
        testimonial: "A fantastic experience! The AI chat feature is intuitive and useful.",
        image: "https://randomuser.me/api/portraits/men/24.jpg",
    },
];

export const Body = () => {
    return (
        <main>
            {/*Carousel*/}
            <div id="carouselExampleCaptions" className="carousel slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={Slider1} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Do you have a project in mind?</h5>
                            <p>We will help you with our AI chat</p>
                            <Link to="/Login">
                                <button type="button" className="btn btn-info btn-lg">Log In</button>
                            </Link>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={Slider2} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>AI will give you the best ideas</h5>
                            <p>Choose a budget for your project, we will give you several ideas for your business</p>
                            <Link to="/Login">
                                <button type="button" className="btn btn-info btn-lg">Log In</button>
                            </Link>
                        </div>
                    </div>
                    <div className="carousel-item">cd
                        <img src={Slider3} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>The power of AI in your hands</h5>
                            <p>With AI and your answers we will customize the project that best suits you</p>
                            <Link to="/Login">
                                <button type="button" className="btn btn-info btn-lg">Log In</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>


            {/*Info*/}
            <div className="container marketing" id="marketing">
                <h5 className="text-center pt-5">Intro</h5>
                <div className="text-center pb-3 pt-0">
                    <h1>We bring your projects and ideas to </h1>
                    <h1>life with artificial intelligence</h1>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <span id="info-img" className="mb-0"><i className="fa-solid fa-users"></i></span>
                        <h2 className="fw-normal text-center mt-0">About Us</h2>
                        <p>At our team, we believe that the best business ideas can come at any time, and we are here to help you bring them to life.</p>
                        <p><a className="btn btn-info btn-lg" href="#">View details »</a></p>
                    </div>

                    <div className="col-lg-4">
                        <span id="info-img" className="mb-0"><i className="fa-solid fa-building"></i></span>
                        <h2 className="fw-normal text-center mt-0">Service</h2>
                        <p>We offer a variety of services tailored to specific project needs. Through our chat you can have ideas for ventures immediately.</p>
                        <p><a className="btn btn-info btn-lg" href="#">View details »</a></p>
                    </div>

                    <div className="col-lg-4">
                        <span id="info-img" className="mb-0"><i className="fa-solid fa-address-book"></i></span>
                        <h2 className="fw-normal text-center mt-0">Contact</h2>
                        <p>Ready to take your project to the next level? Sign up and start using AI for free to get project ideas.</p>
                        <p><a className="btn btn-info btn-lg" href="#">View details »</a></p>
                    </div>

                </div>


                {/*Corporation*/}
                <hr />
                <div className="container" id="corporate-section">
                    <div className="row">
                        <div className="col-4 py-5">
                        <h1 className="text-start fw-bold">The</h1>
                        <h1 className="text-start fw-bold"> Corporate</h1>
                        <p className="mb-0">At INNOVAI, we believe in driving</p>
                        <p className="mt-0">innovation and excellence.</p>
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Our Mission
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p>To be a global leader in AI-driven solutions, transforming ideas into reality for businesses worldwide.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Our Values
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <ol className="list-group list-group-numbered">
                                                <li>Integrity</li>
                                                <li>Innovation</li>
                                                <li>Customer Focus</li>
                                                <li>Collaboration</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Join Us in Our Journey
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                        <p>We are always looking for talented individuals to join our team. If you share our passion for technology and innovation.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <img src={Corporation} alt=""/>
                        </div>
                    </div>
                </div>


                {/*Sections*/}
                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal">Latest News</h2>
                        <h4 className="featurette-heading fw-normal">Stay Informed with Our Relevant News</h4>
                        <p className="lead">In this section we bring you the latest news related to the world of artificial intelligence, technological innovation and the impact they have on the creation of business projects. Our team of experts makes sure to provide you with the latest and most valuable information so that you are always aware of the trends that can transform your ideas into successes.</p>
                        <Link to="/news">
                            <button type="button" className="btn btn-info btn-lg">News</button>
                        </Link>
                    </div>
                    <div className="col-md-5">
                        <img src={News} alt="" />
                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading fw-normal lh-1">Smart Conversations to Boost Your Ideas</h2>
                        <p className="lead">Our AI-powered chat tool is designed to give you personalized support in real-time. With just a few clicks, you can access innovative ideas, fast solutions, and expert advice tailored to your needs. Explore everything our AI has to offer!</p>
                        <br />
                        <h4 className="featurette-heading fw-normal lh-1">Ready to get started?</h4>
                        <p>Talking to our AI is easy! Start a conversation now and find out how we can help you take your project to the next level.</p>
                        <Link to="/advisor">
                            <button type="button" className="btn btn-info btn-lg">Advisor</button>
                        </Link>
                    </div>
                    <div className="col-md-5">
                        <img src={ChatIA} alt="" />
                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1">Convert Currencies Quickly and Accurately</h2>
                        <p className="lead">Our online currency converter allows you to make instant conversions between the world's major currencies. Whether you're planning a trip, making international transactions or simply need to know the value of a currency, with our converter you can get updated real-time exchange rates in just seconds!</p>
                        <h4 className="featurette-heading fw-normal lh-1">Convert your Currencies Now</h4>
                        <p>Start using our currency converter and get the most accurate and up-to-date exchange rates for all your international financial needs!</p>
                        <Link to="/converter">
                            <button type="button" className="btn btn-info btn-lg">Converter</button>
                        </Link>
                    </div>
                    <div className="col-md-5 order-md-1">
                        <img src={Currency} alt="" />
                    </div>
                </div>

                <hr className="featurette-divider" />

            </div>


            {/*Testimonials*/}
            <section className="testimonials-section py-3">
                <div className="container">
                    <h2 className="text-center fw-bold">What Our Clients Say</h2>
                    <div className="row mt-4">
                        {testimonialsData.map((testimonial, index) => (
                            <div className="col-md-4 text-center mb-4" key={index}>
                                <img src={testimonial.image} alt={testimonial.name} className="img-fluid rounded-circle mb-3" />
                                <h5>{testimonial.name}</h5>
                                <h6 className="text-muted">{testimonial.position}</h6>
                                <p className="lead">{`"${testimonial.testimonial}"`}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </main>

    );
};