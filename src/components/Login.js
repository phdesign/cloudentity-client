import { Formik } from "formik"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { Container } from "@mui/system"

export const Login = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Container>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid align="center" item xs={12}>
                <Typography align="center" variant="caption">
                  Don't have an EQL account? Create your EQL account to
                  <br /> enter the draw.
                </Typography>
                <Typography
                  align="center"
                  paragraph
                  sx={{ margin: "20px 0 -10px" }}
                  variant="h4"
                >
                  Log In
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  type="email"
                  variant="standard"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  label="password"
                  name="password"
                  type="password"
                  variant="standard"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="primary"
                  disabled={formik.isSubmitting}
                  fullWidth
                  type="submit"
                  variant="contained"
                >
                  Log In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      )}
    </Formik>
  )
}
