import React, { useEffect, useState } from 'react'

const TextRotator = () => {
    const texts = [
        'RedWave',
        'Your Best',
        'Campaign',
        'Management',
        'Platform'
      ];
      const [currentTextIndex, setCurrentTextIndex] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 2000);
    
        return () => {
          clearInterval(intervalId);
        };
      }, [texts.length]);
  return (
    <div>
        {currentTextIndex === 0 ? (
          <>
          {/* md:text-8xl md:leading-[144.48px] */}
            <span className="text-red-700 text-6xl font-bold font-['DM Sans'] md:text-[64px] md:leading-[74.37px] ">Red</span>
            <span className="text-white text-6xl font-bold font-['DM Sans'] md:text-[64px] md:leading-[74.37px] ">
              {texts[currentTextIndex].replace('Red', '')}
            </span>
          </>
        ) : (
          <span className="text-white text-6xl font-bold font-['DM Sans'] md:text-[64px] md:leading-[74.37px]">
            {texts[currentTextIndex]}
          </span>
        )}
    </div>
  )
}

export default TextRotator