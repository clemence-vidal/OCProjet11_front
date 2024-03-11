import React from "react";
import Banner from "../../components/Banner/banner";
import Features from "../../components/Features/features";
import iconChat from "../../assets/icon-chat.png";
import iconMoney from "../../assets/icon-money.png";
import iconSecurity from "../../assets/icon-security.png";
import "./home.css";

function Home() {
    return (
        <div className="main-content">
            <Banner />
            <section className="features">
                <h2 className="sr-only">Features</h2>
                <Features 
                    icon={iconChat} 
                    alt={"Chat Icon"} 
                    title={"You are our #1 priority"} 
                    p={"Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."}
                />
                <Features  
                    icon={iconMoney} 
                    alt={"Money Icon"} 
                    title={"More savings means higher rates"} 
                    p={"The more you save with us, the higher your interest rate will be!"}
                
                />
                <Features 
                    icon={iconSecurity} 
                    alt={"Security Icon"} 
                    title={"Security you can trust"} 
                    p={"We use top of the line encryption to make sure your data and money is always safe."} 
                
                />
            </section>
        </div>
    )
}

export default Home;