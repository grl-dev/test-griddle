import React from 'react'
import { Checkbox } from 'react-bootstrap'

const CustomHeaderCheckbox = ({ selected, results, filtered, setSelected }) => {

    const checked =  filtered.every(x => selected.includes(x))

    return (
        <Checkbox
            checked={selected.length === results.length || ( checked && filtered.length !== results.length)}
           // checked={checked}
            style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            onChange={e => {

                if (e.target.checked)
                    setSelected(prev => [...new Set([...prev, ...filtered])])
                else
                    setSelected([])
            }}
        />
    )
}

export default React.memo(CustomHeaderCheckbox)