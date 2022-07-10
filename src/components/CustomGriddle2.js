import React, { useEffect, useMemo, useState } from 'react'
import Griddle from 'griddle-react'
import CustomCheckBox from './CustomCheckBox2'
import CustomHeaderCheckbox from './CustomHeaderCheckbox2'
import { Button, Col, ControlLabel, Label, Panel, PanelGroup } from 'react-bootstrap'

const CustomGriddle = (props) => {

    const { children, bsStyle = 'primary', panelTitle, columns, columnMetadata, selection, idSelection, onSelection, selected, setSelected, results, ...rest } = props

    console.log(props)

    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        if (results) {
            setFiltered(results.map(x => x[idSelection]))
        }
    }, [results])


    if (selection && !idSelection) {
        throw Error('Para hacer la selección es necesario especificar el id')
    }

    const selectedColumn = useMemo(() => ({
        columnName: "Selecionar",
        visible: true,
        displayName: "Selecionar",
        sortable: false,
        customComponent: ({ rowData }) => <CustomCheckBox rowData={rowData} idSelection={idSelection} selected={selected} setSelected={setSelected} />,
        customHeaderComponent: () => <CustomHeaderCheckbox results={results} filtered={filtered} selected={selected} setSelected={setSelected} />,
        cssClassName: 'griddle-checkbox',
    }), [selected, filtered])

    const customFilterFunction = (items, query) => {
        const f = items.filter(item => {
            for (var key in item) {
                if (String(item[key]).toLowerCase().indexOf(query.toLowerCase()) >= 0) return true
            }
            return false;
        })

        setFiltered(f.map(x => x[idSelection]))

        return f
    }

    return (

        // <span>Registros({results.length})</span>            
        // <span>Filtrados({filtered.length})</span>             
        // <span>Selecionados({selected.length})</span>    

        <>
            <Panel bsStyle={bsStyle}>
                <Panel.Heading >
                    <Panel.Title>
                        <b>{panelTitle}</b>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body style={{ paddingTop: 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                        {selection ?
                            <h4><Label bsStyle={bsStyle}>{`Selecionados : ${selected.length} / ${results.length}`}</Label></h4>
                            : null
                        }

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: '5px 0px 5px 5px' }}>
                            

                            {children}
                            <Button style={{margin: 2}} bsSize='xs' bsStyle="success" >Exportar a excel</Button>
                        </div>
                    </div>


                    <Griddle
                        {...rest}
                        results={results}
                        showFilter={true}
                        useCustomFilterer={true}
                        customFilterer={customFilterFunction}
                        useGriddleStyles={false}
                        tableClassName='table table-striped table-condensed table-hover table-bordered'
                        columns={(columns ? (selection ? ['Selecionar', ...columns] : columns) : [])}
                        columnMetadata={(columnMetadata ? (selection ? [selectedColumn, ...columnMetadata] : columnMetadata) : [selectedColumn])}
                    />
                </Panel.Body>
            </Panel>
        </>
    )
}

export default CustomGriddle