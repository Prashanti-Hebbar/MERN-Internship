import React, { useState, useEffect } from 'react'
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export default function ViewProduct() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/product/getProducts')
      const data = await response.json()
      if (response.ok) {
        setProducts(data.products)
      } else {
        console.error('Failed to fetch products:', data.message)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/product/deleteProductById/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (response.ok) {
        fetchProducts()
      } else {
        console.error('Failed to delete product:', data.message)
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={1}>
        View Products
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        All products listed below.
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
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Price</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Quantity</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Description</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }} align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length > 0 ? products.map((prod, index) => (
                <TableRow key={prod._id} sx={{
                  '&:hover': { bgcolor: 'rgba(102,126,234,0.05)' },
                  transition: 'background 0.2s',
                }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{prod.name}</TableCell>
                  <TableCell>${prod.price}</TableCell>
                  <TableCell>{prod.quantity}</TableCell>
                  <TableCell>{prod.description}</TableCell>
                  <TableCell align="center">
                    <IconButton color="error" onClick={() => handleDelete(prod._id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">No products found</Typography>
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