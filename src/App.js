import { VideoChat } from "./components";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header>
        <h1>Video Chat for Gatherly</h1>
      </header>
      <main>
        <VideoChat />
      </main>
      <footer>
        <p>
          by{" "}
          <a href="https://www.linkedin.com/in/albert-wright-3b2466202/">
            Albert Wright
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
