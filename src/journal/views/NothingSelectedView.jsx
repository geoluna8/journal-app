import { StarOutline } from "@mui/icons-material"
import { Grid2, Typography } from "@mui/material"

export const NothingSelectedView = () => {
  return (
    <Grid2
    className="animate__animated animate__fadeIn animate__faster"
    container
    spacing={ 0 }
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius: 3 }}
    >
        <Grid2 item xs={ 12 }>
            <StarOutline sx={{ fontSize: 100, color: 'white' }} />
        </Grid2>
        <Grid2 item xs={ 12 }>
            <Typography color="white" variant="h5">Selecciona o crea una entrada</Typography>
        </Grid2>
    </Grid2>
  )
}

