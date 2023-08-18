import "./Header.css";
import moonIcon from "../../assets/images/icon-moon.svg";
import sunIcon from "../../assets/images/icon-sun.svg";
import { useTheme } from "../../ThemeContext";
import { useRef } from "react";
import lightSwitchAudio from "./light-switch-81967.mp3";

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const audioRef = useRef();

  const playSound = () => {
    audioRef.current.play();
  };

  return (
    <header>
      <h1>TODO</h1>
      <audio
        ref={audioRef}
        src={lightSwitchAudio}
        type="audio/mp3"
      ></audio>
      <button
        className="theme-toggle-btn"
        onClick={() => {
          toggleTheme();
          playSound();
        }}
      >
        {isDark ? (
          <img src={sunIcon} alt="moon-icon" />
        ) : (
          <img src={moonIcon} alt="moon-icon" />
        )}
      </button>
    </header>
  );
};
export default Header;
