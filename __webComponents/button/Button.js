'use client'

import Image from 'next/image';
import React, { useState } from 'react';

const Button = ({ title, font = "18px", onClick, img1, img2, width, height, backgroundColor, bgHover, borderRadius }) => {
  const [hover, setHover] = useState(false);

  const styles = {
    borderRadius: borderRadius || '2px',
    backgroundColor: backgroundColor || '#E1683B',
    color: "#ffffff",
    border: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '10px',
    width: width,
    height: height,
    fontSize: font,
    fontFamily: "Avenir5"
  };

  const handleHover = {
    backgroundColor: bgHover || "#B4522D"
  };

  return (
    <button
      style={{ ...styles, ...(hover ? handleHover : null) }}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {img1 && <Image src={img1} alt="icon" />}
      {title}
      {img2 && <Image src={img2} alt="icon" />}
    </button>
  );
};

export default Button;
