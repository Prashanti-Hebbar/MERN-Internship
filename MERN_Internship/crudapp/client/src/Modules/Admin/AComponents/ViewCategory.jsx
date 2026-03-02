import React, { useState, useEffect } from 'react'
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export default function ViewCategory() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('categories')) || []
    setCategories(stored)
  }, [])

  const handleDelete = (id) => {
    const updated = categories.filter((cat) => cat.id !== id)
    setCategories(updated)
    localStorage.setItem('categories', JSON.stringify(updated))
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={1}>
        View Categories
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        All categories listed below.
      </Typography>

      <Paper elevation={0} sx={{
        borderRadius: 3,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0,0,0,0.05)',
      }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>#</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Category Name</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }} align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.length > 0 ? categories.map((cat, index) => (
                <TableRow key={cat.id} sx={{
                  '&:hover': { bgcolor: 'rgba(102,126,234,0.05)' },
                  transition: 'background 0.2s',
                }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{cat.name}</TableCell>
                  <TableCell align="center">
                    <IconButton color="error" onClick={() => handleDelete(cat.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">No categories found</Typography>
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
