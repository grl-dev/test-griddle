import React, { useState } from 'react';
import { Button, Label } from 'react-bootstrap';
import './App.css';
import CustomGriddle from './components/CustomGriddle2';
import db from './db/MOCK_DATA.json'

function App() {
  const [selected, setSelected] = useState([])

  return (
    <div className='container' style={{padding: 10}}>

      <CustomGriddle
        bsStyle="primary"
        panelTitle="Grilla dinámica"
        columns={['id', 'first_name', 'last_name', 'email', 'gender', 'ip_address']}
        results={db}
        selection={true}
        idSelection='id'
        selected={selected}
        setSelected={setSelected}
        resultsPerPage={50}
        columnMetadata={[
          { displayName: 'Nombre', columnName: 'name' }
        ]}
      >
        {/* los children components está pensado para que sean botones, pero podría ser otra cosa */}
      </CustomGriddle>
    </div>
  );
}

export default App;
