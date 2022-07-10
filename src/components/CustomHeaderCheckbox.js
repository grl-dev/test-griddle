import React, { useEffect, useState } from 'react'
import { Checkbox } from 'react-bootstrap'

const CustomHeaderCheckbox = ({ selected, results, setSelected, idSelection }) => {

    // console.log('CustomHeaderCheckbox')

    return (
        <Checkbox
            checked={selected.length === results.length}
            onChange={e => {
                if (e.target.checked) {
                    setSelected([...results.map(x => x[idSelection])])
                } else {
                    setSelected([])
                }
            }}
            style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        />
    )
}

export default React.memo(CustomHeaderCheckbox)