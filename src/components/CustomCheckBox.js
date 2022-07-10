import React from 'react'
import { Checkbox } from 'react-bootstrap'

const CustomCheckBox = ({ rowData, idSelection, selected, setSelected}) => {

    // console.log('CustomCheckBox')

    const { [idSelection]: id } = rowData

    return (
        <Checkbox
            checked={selected.filter(x => x === id).length > 0}
            onChange={() => {
                const val = selected.filter(x => x === id)
                if (val.length > 0) {
                    setSelected(selected.filter(x => x !== id))
                } else {
                    setSelected([...selected, id])
                }          
            }}
            style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        />
    )
}

export default React.memo(CustomCheckBox)