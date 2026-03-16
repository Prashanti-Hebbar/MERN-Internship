import React, { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  Divider
} from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"

export default function AddCategory() {

  const [category, setCategory] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {

    e.preventDefault()

    if (!category.trim()) return

    const existing = JSON.parse(localStorage.getItem("categories")) || []

    existing.push({
      name: category.trim(),
      id: Date.now()
    })

    localStorage.setItem("categories", JSON.stringify(existing))

    setCategory("")
    setSuccess(true)

    setTimeout(() => setSuccess(false), 3000)
  }

  return (

    <Box sx={{ p: 4 }}>

      {/* Page Title */}

      <Box sx={{ mb: 3 }}>

        <Typography
          variant="h4"
          fontWeight={700}
        >
          Add Category
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Create categories to organize your books
        </Typography>

      </Box>

      {/* Form Card */}

      <Paper
        elevation={0}
        sx={{
          p: 4,
          maxWidth: 600,
          borderRadius: 3,
          border: "1px solid #e5e7eb"
        }}
      >

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2
          }}
        >

          <AddCircleOutlineIcon
            sx={{ color: "#6366f1" }}
          />

          <Typography fontWeight={600}>
            Category Details
          </Typography>

        </Box>

        <Divider sx={{ mb: 3 }} />

        {success && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
          >
            Category added successfully
          </Alert>
        )}

        <form onSubmit={handleSubmit}>

          <TextField
            label="Category Name"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Example: Fiction, Science, History"
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              px: 4,
              py: 1.3,
              fontWeight: 600,
              background: "#6366f1",
              borderRadius: 2,
              "&:hover": {
                background: "#4f46e5"
              }
            }}
          >
            Add Category
          </Button>

        </form>

      </Paper>

    </Box>

  )
}