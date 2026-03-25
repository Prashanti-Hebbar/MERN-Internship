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
import Products from "./Products";

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
    <div>
  <Box sx={{ p: 4, background: "#eef2f7", minHeight: "100vh" }}>
    {/* 🔥 HEADER */}
    <Box mb={4}>
      <Typography variant="h5" fontWeight={700} color="#1e293b">
        Shop Products
      </Typography>
      <Typography color="#64748b">
        Browse and add products to your cart
      </Typography>
    </Box>

    {/* 🔍 SEARCH */}
    <Box mb={4}>
      <TextField
        fullWidth
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          background: "#fff",
          borderRadius: 2,
        }}
      />
    </Box>

    {/* 🧾 CART */}
    <Box mb={4}>
      <Chip
        label={`Cart: ${cart.length} items`}
        sx={{
          background: "#334155",
          color: "#fff",
          fontWeight: 500,
        }}
      />
    </Box>

    {/* 🛍️ GRID */}
    {/* <Grid container spacing={3} alignItems="stretch">
      {filteredProducts.length === 0 ? (
        <Typography>No products found</Typography>
      ) : (
        filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id} sx={{ display: "flex" }}>
            <Card
              sx={{
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%", // 🔥 equal height
                border: "1px solid #e2e8f0",
                boxShadow: "none",
                transition: "0.2s",
                "&:hover": {
                  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                  transform: "translateY(-3px)",
                },
              }}
            > */}
              {/* IMAGE */}
              {/* <CardMedia
                component="img"
                image={
                  product.productimage
                    ? `http://localhost:3000/uploads/${product.productimage}`
                    : "https://via.placeholder.com/300x180"
                }
                alt={product.name}
                sx={{
                  height: 180,
                  objectFit: "cover",
                  background: "#f1f5f9",
                }}
              /> */}

              {/* CONTENT */}
              {/* <CardContent sx={{ flexGrow: 1 }}>
                <Typography fontWeight={600} color="#0f172a">
                  {product.name}
                </Typography>

                <Typography
                  fontSize={14}
                  color="#64748b"
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

                <Typography
                  fontWeight={700}
                  mt={2}
                  color="#334155"
                >
                  ₹{product.price}
                </Typography>
              </CardContent> */}

              {/* ACTION */}
              {/* <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  onClick={() => addToCart(product)}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    background: "#475569",
                    color: "#fff",
                    "&:hover": {
                      background: "#334155",
                    },
                  }}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
        ))
      )}
    </Grid> */}

    <Products />
  </Box>
  </div>
);
}
