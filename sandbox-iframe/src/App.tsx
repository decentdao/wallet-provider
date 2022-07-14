import './components/styles/main.css';
import { useMemo } from 'react';
import { ModuleApp } from './components/ModuleApp';
import { NoParent } from './components/NoParent';

function App() {
  const isIframe = useMemo(() => window.location !== window.parent.location, []);
 if(isIframe) {
  return <ModuleApp />
 }
 return <NoParent />
  
}

export default App;
