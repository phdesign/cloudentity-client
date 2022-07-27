import { Formik } from "formik"
import { Container, Grid, TextField, Typography } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"

export const Login = ({ onSubmit, loading }) => {
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
                <LoadingButton
                  loading={loading}
                  color="primary"
                  disabled={formik.isSubmitting}
                  fullWidth
                  type="submit"
                  variant="contained"
                >
                  Log In
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Container>
      )}
    </Formik>
  )
}
