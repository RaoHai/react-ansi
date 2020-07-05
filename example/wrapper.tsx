import React from 'react';

export default function wrapper({ children }){
  return <div style={{ fontSize: 12 }}>
    {children}
  </div>
}