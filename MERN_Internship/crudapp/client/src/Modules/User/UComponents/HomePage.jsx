import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
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
    axios
      .get("http://localhost:3000/product/getProducts")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.error(err));
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
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
            color: "white",
          }}
        />
      </Box>

      {/* 🛍️ PRODUCT GRID */}
      <Grid container spacing={3}>
        {filteredProducts.length === 0 ? (
          <Typography>No products found</Typography>
        ) : (
          filteredProducts.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={product._id}
              sx={{ display: "flex" }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.3s",
                  width: "100%",
                  "&:hover": {
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    transform: "translateY(-5px)",
                  },
                }}
              >
                {/* 🔥 IMAGE */}
                <CardMedia
                  component="img"
                  image={
                    product.productimage
                      ? `http://localhost:3000/uploads/${product.productimage}`
                      : "https://via.placeholder.com/300x180"
                  }
                  alt={product.name}
                  sx={{
                    height: 180,
                    objectFit: "cover", // 🔥 prevents distortion
                  }}
                />

                {/* 🔹 CONTENT */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={700}>
                    {product.name}
                  </Typography>

                  <Typography color="primary" fontWeight={600} mt={1}>
                    ₹{product.price}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={1}
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {product.description}
                  </Typography>
                </CardContent>

                {/* 🔹 ACTION */}
                <CardActions sx={{ mt: "auto" }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => addToCart(product)}
                    sx={{
                      borderRadius: 2,
                      background: "linear-gradient(90deg, #6366f1, #a855f7)",
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
