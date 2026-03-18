import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Chip
} from "@mui/material";
import axios from "axios";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:3000/product/getProducts")
      .then(res => {
        setProducts(res.data.products);
      })
      .catch(err => console.error(err));
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 4, background: "#f5f7fa", minHeight: "100vh" }}>

      {/* 🔥 HEADER */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700}>
          🛒 Shop Products
        </Typography>
        <Typography color="text.secondary">
          Browse and add products to your cart
        </Typography>
      </Box>

      {/* 🔍 SEARCH */}
      <Box mb={4}>
        <TextField
          fullWidth
          label="Search Products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* 🧾 CART SUMMARY */}
      <Box mb={4}>
        <Chip
          label={`Cart: ${cart.length} items`}
          sx={{
            background: "linear-gradient(90deg, #6366f1, #a855f7)",
            color: "white"
          }}
        />
      </Box>

      {/* 🛍️ PRODUCT GRID */}
      <Grid container spacing={3}>
        {filteredProducts.length === 0 ? (
          <Typography>No products found</Typography>
        ) : (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>

                <Typography fontWeight={700}>
                  {product.name}
                </Typography>

                <Typography color="text.secondary" mt={1}>
                  ₹{product.price}
                </Typography>

                <Typography variant="body2" mt={1}>
                  {product.description}
                </Typography>

                <Box mt={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => addToCart(product)}
                    sx={{
                      background: "linear-gradient(90deg, #6366f1, #a855f7)"
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>

              </Paper>
            </Grid>
          ))
        )}
      </Grid>

    </Box>
  );
}