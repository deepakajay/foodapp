import React from 'react'
import MaterialTable from 'material-table'
import {ThemeProvider, createTheme} from "@mui/material"

const DataTable = ({columns, data, title, actions}) => {
    const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
        <MaterialTable columns={columns} data={data} title={title} actions={actions}/>
    </ThemeProvider>
  )
}

export default DataTable