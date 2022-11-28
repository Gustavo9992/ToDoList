import { CreateTask } from './components/CreateTask';
import { Header } from './components/Header';

import './global.css';

export function App() {
  return (
    <div>
      <Header />
      <CreateTask />
    </div>
  );
}
