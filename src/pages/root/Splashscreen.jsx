import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSpring, animated } from '@react-spring/web';




const Splashscreen = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 


  //const FadeIn = () => {
  const fadeInStyles = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });

  useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 3000);
      return () => clearTimeout(timer);
  }, [navigate]);

  return (

    <div className='flex flex-col w-100% h-screen justify-center items-center bg-[#F2F2F2] animate-fade-in transition-opacity duration-500'> 
      <div className='absolute top-3 md:top-3 lg:top-3'>
        <img className='w-30 md:w-30 lg:w-35 ' src="FElogo.svg" alt="" /> 
      </div>

      <animated.div style={fadeInStyles} className='logo flex flex-col items-center pb-16'>
            <img className='flex flex-row w-40 md:w-64 lg:w-80 justify-center' src="/Logo Mojokerto Sehat.svg" alt="imglogo" />
            <p className='font-[raleway] font-extrabold text-[#025F96] text-2xl md:text-3xl lg:text-4xl items-center '>MOJOKERTO SEHAT</p>
            <div className=' flex flex-row '>
              <p className='text-[16px] text-[#438222] italic item-ends justify-end mr-0'>Dinas Kesehatan Kab.Mojokerto</p>
            </div>
      </animated.div>
      <div className='flex flex-col w-screen items-center bottom-0 justify-center absolute transition-all'>
        <img className='flex flex-row justify-center object-contain w-screen' src="/footer.svg" alt="imgfooter" />
      </div>
    </div>

  )
}

export default Splashscreen
