import React, { useState, useEffect, useRef } from 'react';

//css
import './catloader.scss';

const Loader = () =>
  <div className='w-screen h-screen flex justify-center items-center bg-slate-600'>
    <div className="circle-container">
      <div className="circle-content" />
      <div className="animated-block first" />
      <div className="animated-block second" />
    </div>
  </div>

export default Loader;
