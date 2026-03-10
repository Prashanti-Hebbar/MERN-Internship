import React, { useState } from 'react'
import { Box, Typography, Paper, TextField, Button, Alert } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    description: ''
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!formData.name.trim() || !formData.price || !formData.quantity || !formData.description.trim()) {
      setError('All fields are required')
      return
    }

    try {
      const response = await fetch('/product/createProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (response.ok) {
        setSuccess(true)
        setFormData({ name: '', price: '', quantity: '', description: '' })
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setError(data.message || 'Failed to add product')
      }
    } catch (err) {
      setError('Error adding product')
      console.error(err)
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Paper elevation={0} sx={{
        p: 5, width: 500, borderRadius: 4,
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0,0,0,0.05)',
        textAlign: 'center',
      }}>
        <AddCircleOutlineIcon sx={{ fontSize: 48, color: '#667eea', mb: 2 }} />
        <Typography variant="h5" fontWeight={700} mb={1}>
          Add Product
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Create a new product for your inventory
        </Typography>

        {success && <Alert severity="success" sx={{ mb: 2 }}>Product added successfully!</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth label="Product Name" name="name" variant="outlined"
            value={formData.name} onChange={handleChange}
            required sx={{ mb: 2 }}
          />
          <TextField
            fullWidth label="Price" name="price" type="number" variant="outlined"
            value={formData.price} onChange={handleChange}
            required sx={{ mb: 2 }}
          />
          <TextField
            fullWidth label="Quantity" name="quantity" type="number" variant="outlined"
            value={formData.quantity} onChange={handleChange}
            required sx={{ mb: 2 }}
          />
          <TextField
            fullWidth label="Description" name="description" variant="outlined"
            value={formData.description} onChange={handleChange}
            required multiline rows={3} sx={{ mb: 3 }}
          />
          <Button
            type="submit" fullWidth variant="contained" size="large"
            sx={{
              py: 1.5, borderRadius: 50, fontWeight: 700, fontSize: '1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': { background: 'linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)' },
            }}
          >
            Add Product
          </Button>
        </form>
      </Paper>
    </Box>
  )
}