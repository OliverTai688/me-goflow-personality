import React from 'react';

interface WelcomeProps {
  title: string;
  description: string;
  buttonText: string;
}

const Welcome: React.FC<WelcomeProps> = ({ title, description, buttonText }) => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="py-6">{description}</p>
          <button className="btn btn-primary">{buttonText}</button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;