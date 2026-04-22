import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Chip,
  Container,
  Button,
} from "@mui/material";
import axios from "axios";
import Products from "./Products";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/product/getProducts")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box sx={{ background: "#f1f5f9", minHeight: "100vh" }}>

      {/* 🔥 HERO SECTION */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
          color: "#fff",
          py: 8,
          px: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight={700}>
          Discover Amazing Products
        </Typography>

        <Typography sx={{ mt: 2, opacity: 0.8 }}>
          Shop smart. Book instantly. Experience better.
        </Typography>

        <TextField
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mt: 4,
            width: "100%",
            maxWidth: 500,
            background: "#fff",
            borderRadius: 2,
          }}
        />
      </Box>

      {/* 🔥 CONTENT */}
      <Container maxWidth="lg" sx={{ mt: -6 }}>

        {/* 🧾 CART + ACTION BAR */}
        <Box
          sx={{
            background: "#fff",
            p: 2,
            borderRadius: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            mb: 4,
          }}
        >
          <Typography fontWeight={600}>
            {products.length} Products Available
          </Typography>

          <Chip
            label={`🛒 ${cart.length} items`}
            sx={{
              background: "#1e293b",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        </Box>

        {/* 🧠 OPTIONAL FILTER TAGS */}
        <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
          {["All", "Popular", "New", "Trending"].map((tag) => (
            <Chip
              key={tag}
              label={tag}
              clickable
              sx={{
                background: "#e2e8f0",
                "&:hover": { background: "#cbd5f5" },
              }}
            />
          ))}
        </Box>

        {/* 🛍 PRODUCTS */}
        <Products search={search} />

      </Container>
    </Box>
  );
}