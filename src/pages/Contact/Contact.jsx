import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
        >
          Get in touch with us for any questions or inquiries
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {/* Contact Form Column */}
          <Grid item xs={12} md={6}>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
              >
                Send Message
              </Button>
            </Box>
          </Grid>

          {/* Contact Info & Social Media Column */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5" gutterBottom>
                Contact Information
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Email sx={{ mr: 2, color: "primary.main" }} />
                <Typography>contact@example.com</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Phone sx={{ mr: 2, color: "primary.main" }} />
                <Typography>+1 (555) 123-4567</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <LocationOn sx={{ mr: 2, color: "primary.main" }} />
                <Typography>123 Business Street, City, Country</Typography>
              </Box>

              <Typography variant="h5" gutterBottom>
                Follow Us
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                <IconButton color="primary" aria-label="Facebook">
                  <Facebook />
                </IconButton>
                <IconButton color="primary" aria-label="Twitter">
                  <Twitter />
                </IconButton>
                <IconButton color="primary" aria-label="Instagram">
                  <Instagram />
                </IconButton>
                <IconButton color="primary" aria-label="LinkedIn">
                  <LinkedIn />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
