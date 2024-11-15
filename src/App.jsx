import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import MapComponent from './MapComponent.jsx';

function App() {
    return (
      <>
        <header>
          <h1 className="text-center text-2xl font-bold">NYC Real Estate Building Complaints App</h1>
        </header>
        <main className="container mx-auto p-4">
          <MapComponent />
        </main>
      </>
    );
}

export default App
