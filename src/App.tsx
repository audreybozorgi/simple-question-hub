import React from 'react'
import styles from './index.module.scss'
import Routes from './routes';

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <Routes />
    </div>
  );
}

export default App;
