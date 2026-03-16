import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  TablePagination,
} from "@mui/material";

export default function ViewUser() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/getUser")
      .then((res) => {
        const all = res.data.allusers || [];
        setUsers(all);
        setFiltered(all);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(users);
    } else {
      const t = search.toLowerCase();
      setFiltered(
        users.filter(
          (u) =>
            u.name.toLowerCase().includes(t) ||
            u.email.toLowerCase().includes(t),
        ),
      );
    }
    setPage(0);
  }, [search, users]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (uid) => {
  axios
    .delete(`http://localhost:3000/user/deleteUserById/${uid}`)
    .then((res) => {
      alert("User Deleted..!")

      const updatedUsers = users.filter((u) => u._id !== uid)

      setUsers(updatedUsers)
      setFiltered(updatedUsers)
    })
    .catch((error) => {
      console.error(error)
    })
}



  return (
    <Paper sx={{ p: 3, mt: 2 }} elevation={3}>
      <Typography variant="h5" mb={2} fontWeight={600}>
        User List
      </Typography>

      <TextField
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        size="small"
        sx={{ mb: 2 }}
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="users table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>NAME</TableCell>
                  <TableCell>EMAIL</TableCell>
                  <TableCell>PHONE</TableCell>
                  <TableCell>ADDRESS</TableCell>
                  <TableCell>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => (
                    <TableRow
                      key={user._id}
                      hover
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.address}</TableCell>
                      <TableCell>
                        <button onClick={() => handleUpdate(user._id)}>UPDATE</button>
                        <button
                          variant="outlined"
                          onClick={() => handleDelete(user._id)}>
                          DELETE
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </>
      )}
    </Paper>
  );
}
