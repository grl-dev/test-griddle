import React, { useEffect, useMemo, useState } from 'react'
import Griddle from 'griddle-react'
import CustomCheckBox from './CustomCheckBox'
import CustomHeaderCheckbox from './CustomHeaderCheckbox'

const CustomGriddle = (props) => {

    const { columns, columnMetadata, selection, idSelection, onSelection, results, ...rest } = props
    const [selected, setSelected] = useState([])

    if (selection && !idSelection) {
        throw Error('Para hacer la selección es necesario especificar el id')
    }
    
  console.log('render')

    useEffect(() => {
        if(onSelection){
            onSelection(selected)
        }
    }, [selected])

    const selectedColumn = useMemo(() => ({
        columnName: "Selecionar",
        visible: true,
        displayName: "Selecionar",
        sortable: false,
        customComponent: ({rowData}) => <CustomCheckBox rowData={rowData} idSelection={idSelection} selected={selected} setSelected={setSelected}/>,
        customHeaderComponent: () => <CustomHeaderCheckbox results={results} idSelection={idSelection} selected={selected} setSelected={setSelected}/>,
        cssClassName: 'griddle-checkbox',
    }), [selected])

    return (

        <>
            <Griddle
                {...rest}
                results={results}
                useGriddleStyles={false}
                tableClassName='table table-striped table-condensed table-hover table-bordered'
                columns={(columns ? (selection ? ['Selecionar', ...columns] : columns) : [])}
                columnMetadata={(columnMetadata ? (selection ? [selectedColumn, ...columnMetadata] : columnMetadata) : [selectedColumn])}
            />
        </>
    )
}

export default CustomGriddle