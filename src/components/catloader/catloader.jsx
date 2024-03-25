import React, { useState, useEffect, useRef } from 'react';

//css
import './catloader.scss';

const Loader = () =>
  <div className='w-screen h-screen bg-slate-600'>
    <div className="circle-container absolute top-1/2 left-1/2">
      <div className="circle-content" />
      <div className="animated-block first" />
      <div className="animated-block second" />
    </div>
  </div>

export default Loader;
