import React, { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField
} from "@mui/material"

export default function ViewCategory() {

  const [categories, setCategories] = useState([])
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState("")

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("categories")) || []
    setCategories(stored)
  }, [])

  const updateStorage = (data) => {
    localStorage.setItem("categories", JSON.stringify(data))
  }

  const handleDelete = (id) => {

  const updatedCategories = categories.filter((cat) => cat.id !== id)

  setCategories(updatedCategories)

  updateStorage(updatedCategories)

  if (editId === id) {
    setEditId(null)
    setEditName("")
  }
}

  const handleEdit = (cat) => {
    setEditId(cat.id)
    setEditName(cat.name)
  }

  const handleUpdate = (id) => {
    const updated = categories.map((cat) =>
      cat.id === id ? { ...cat, name: editName } : cat
    )

    setCategories(updated)
    updateStorage(updated)
    setEditId(null)
    setEditName("")
  }

  const handleCancel = () => {
    setEditId(null)
    setEditName("")
  }

  return (
    <Box>

      <Typography variant="h4" fontWeight={700} mb={1}>
        View Categories
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={4}>
        All categories listed below
      </Typography>

      <Paper sx={{ borderRadius: 3 }}>

        <TableContainer>

          <Table>

            <TableHead>
              <TableRow sx={{ background: "#667eea" }}>
                <TableCell sx={{ color: "#fff", fontWeight: 700 }}>#</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                  Category Name
                </TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: 700 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {categories.length > 0 ? (

                categories.map((cat, index) => (

                  <TableRow key={cat.id}>

                    <TableCell>{index + 1}</TableCell>

                    <TableCell>

                      {editId === cat.id ? (

                        <TextField
                          size="small"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />

                      ) : (

                        cat.name

                      )}

                    </TableCell>

                    <TableCell align="center">

                      {editId === cat.id ? (

                        <>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => handleUpdate(cat.id)}
                            sx={{ mr: 1 }}
                          >
                            Save
                          </Button>

                          <Button
                            size="small"
                            variant="outlined"
                            onClick={handleCancel}
                          >
                            Cancel
                          </Button>
                        </>

                      ) : (

                        <>
                          <Button
                            size="small"
                            variant="text"
                            onClick={() => handleEdit(cat)}
                            sx={{ mr: 1 }}
                          >
                            Update
                          </Button>

                          <Button
                            size="small"
                            color="error"
                            variant="text"
                            onClick={() => handleDelete(cat.id)}
                          >
                            Delete
                          </Button>
                        </>

                      )}

                    </TableCell>

                  </TableRow>

                ))

              ) : (

                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No categories found
                  </TableCell>
                </TableRow>

              )}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

    </Box>
  )
}