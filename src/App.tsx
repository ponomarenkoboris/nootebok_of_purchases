import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components'
import { Pages } from './pages';
import './App.scss';
import { ErrorNotification } from './components';
import { ProtectedRoutesContext } from './context/ProtectedRoutesContext';

function App() {
    
    return (
        <div className="App">
            <BrowserRouter>
                <ProtectedRoutesContext>
                    <Navbar />
                    <Pages />
                </ProtectedRoutesContext>
            </BrowserRouter>
            <ErrorNotification showingTime={2000}/>
        </div>
  );
}

export default App;
