import './App.css';
//import ProjectsPage from './projects/ProjectsPage';
//import Hello from './Helo';
import HelloSecond from "./HelloSecond";

function App() {
  return (
    <div className='container'>
      <HelloSecond name="Susan" enthusiasmLevel={8} />
    </div>
  );
}

export default App;
