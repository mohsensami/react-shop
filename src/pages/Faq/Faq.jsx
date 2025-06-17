import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header";

const faqData = [
  {
    question: "What is your return policy?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. We offer a 30-day return policy for all products in their original condition.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. You can track your order through your account dashboard or using the tracking number provided in your shipping confirmation email.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. We accept all major credit cards, PayPal, and bank transfers.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Yes, we ship to most countries worldwide. Shipping times and costs vary by location.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. You can reach our customer support team through email, phone, or live chat during business hours.",
  },
];

const Faq = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: "bold" }}
        >
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {faqData.slice(0, 3).map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  mb: 2,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  "&:before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "&:hover": {
                      backgroundColor: "#eeeeee",
                    },
                  }}
                >
                  <Typography variant="h6" component="div">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            {faqData.slice(3).map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  mb: 2,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  "&:before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "&:hover": {
                      backgroundColor: "#eeeeee",
                    },
                  }}
                >
                  <Typography variant="h6" component="div">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Faq;
