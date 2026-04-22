import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Divider,
} from "@mui/material";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/product/getProductById/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <Typography p={4}>Loading...</Typography>;

  return (
    <Box sx={{ background: "#fff", minHeight: "100vh" }}>
      
      {/* TOP BAR */}
      <Box sx={{ px: { xs: 2, md: 6 }, py: 2 }}>
        <Typography
          sx={{
            cursor: "pointer",
            fontSize: 14,
            color: "#6b7280",
          }}
          onClick={() => navigate(-1)}
        >
          ← Back
        </Typography>
      </Box>

      {/* MAIN */}
      <Box
        sx={{
          px: { xs: 2, md: 6 },
          pb: 6,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" },
          gap: 6,
        }}
      >
        {/* IMAGE */}
        <Box
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: 3,
            p: 3,
            background: "#fafafa",
          }}
        >
          <Box
            component="img"
            src={`http://localhost:3000/uploads/${product.productimage}`}
            alt={product.name}
            sx={{
              width: "100%",
              height: 420,
              objectFit: "contain",
            }}
          />
        </Box>

        {/* DETAILS */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* TITLE */}
          <Typography fontSize={28} fontWeight={700}>
            {product.name}
          </Typography>

          <Typography
            sx={{ mt: 1, color: "#6b7280", fontSize: 14 }}
          >
            Category: {product.categoryId?.name}
          </Typography>

          {/* PRICE */}
          <Typography
            sx={{
              mt: 3,
              fontSize: 30,
              fontWeight: 700,
              color: "#111",
            }}
          >
            ₹{product.price}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* DESCRIPTION */}
          <Box>
            <Typography fontWeight={600} mb={1}>
              Description
            </Typography>

            <Typography
              sx={{
                color: "#4b5563",
                lineHeight: 1.7,
                fontSize: 15,
              }}
            >
              {product.description}
            </Typography>
          </Box>

          {/* ACTION PANEL */}
          <Box
            sx={{
              mt: "auto",
              pt: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{
                height: 48,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                background: "#111",
                "&:hover": {
                  background: "#000",
                },
              }}
            >
              Add to Cart
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate(`/user/bookingform/${id}`)}
              sx={{
                height: 48,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                borderColor: "#111",
                color: "#111",
                "&:hover": {
                  background: "#f3f4f6",
                },
              }}
            >
              Buy Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}