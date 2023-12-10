import { useState, useEffect } from 'react';
import profileImg from "@/public/profile-img.png"
import Image from 'next/image';

function WhatsAppComponent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 7000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const closeWhatsAppComponent = () => {
        setIsVisible(false);
    };

    return (
        isVisible && (
            <div className="whatsapp-popup p-4  px-5 sm:px-10 ">
                <div className="close-button" onClick={closeWhatsAppComponent}>
                    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9345 13.687L2.42262 24L0 22.5358L18.3988 0L20.7887 1.71883L12.7024 11.5225L22 21.9947L19.5119 23.8727L10.9345 13.687ZM2.84821 0.159153L9.85417 8.05305L7.92262 10.2493L0.6875 1.7825L2.84821 0.159153Z" fill="white" />
                    </svg>


                </div>
                <div className="child">
                <Image src={profileImg} alt="hindi highlight logo" className="w-full h-auto rounded-full wh_img"/>
                <h3 className="color:white font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl">ताजा खबरों के लिए व्हाट्सएप ग्रुप से जुड़ें</h3>
                <a  
                    href="https://chat.whatsapp.com/F8w3oAmhvHLKZVxugWbzbd" // Modify this link
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="join-button">Join WhatsApp Group</div>
                </a>
                </div>

            </div>
        )
    );
}

export default WhatsAppComponent;
