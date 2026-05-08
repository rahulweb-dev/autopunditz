"use client";

import {
  DataGrid,
} from "@mui/x-data-grid";

import Paper from "@mui/material/Paper";

export default function CommonDataTable({

  rows = [],

  columns = [],

  loading = false,

  checkboxSelection = false,

  height = 550,

}) {

  return (

    <Paper
      sx={{
        height,
        width: "100%",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >

      <DataGrid

        rows={rows}

        columns={columns}

        loading={loading}

        checkboxSelection={
          checkboxSelection
        }

        disableRowSelectionOnClick

        pageSizeOptions={[
          5,
          10,
          25,
          50,
        ]}

        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}

        sx={{

          border: 0,

          "& .MuiDataGrid-columnHeaders":
          {
            backgroundColor:
              "#f8fafc",

            fontSize: 15,

            fontWeight: 700,
          },

          "& .MuiDataGrid-cell":
          {
            borderColor:
              "#f1f5f9",
          },

          "& .MuiDataGrid-row:hover":
          {
            backgroundColor:
              "#f8fafc",
          },
        }}
      />

    </Paper>
  );
}