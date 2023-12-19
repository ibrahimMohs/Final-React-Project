import { useEffect, useState } from "react";
import { ReactComponent as PopcornKernelSVG } from './PopcornKernel.svg';
import '../Animation/Animation.scss';


type PopcornKernelProps = {
    animation: string;
    style: React.CSSProperties;
  };
  
  const PopcornKernel: React.FC<PopcornKernelProps> = ({ animation, style }) => {
    return <PopcornKernelSVG style={style} />;
  };

const Animation = () => {
    const [showPopcorn, setShowPopcorn] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setShowPopcorn(false), 1000);
      return () => clearTimeout(timer);
    }, []);
  
    const getRandomAnimation = (): string => {
      const animations = ['pop1', 'pop2', 'pop3', 'pop4', 'pop5'];
      return animations[Math.floor(Math.random() * animations.length)];
    };
  
    const getRandomPositionStyle = (): React.CSSProperties => {
      const x = Math.random() * 200 - 150;
      const y = Math.random() * 200 - 150;
      return {
        position: 'absolute',
        left: `${50 + x}%`,
        bottom: `${50 + y}%`,
        animation: `${getRandomAnimation()} 1.5s ease-out forwards`,
      };
    };
    return(
        <div className="app">
      {showPopcorn && (
        <div className="popcorn-container">
          {Array.from({ length: 20 }).map((_, index) => (
            <PopcornKernel
              key={index}
              animation={getRandomAnimation()}
              style={getRandomPositionStyle()}
            />
          ))}
        </div>
      )}
    </div>
    );
};

export default Animation;