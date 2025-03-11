import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid2, TextField, Typography } from "@mui/material"
import { ImageGallery } from "./ImageGallery"

export const NoteView = () => {
  return (
    <Grid2
        container
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 1 }}
        alignItems="center"
    >
        <Grid2 item>
            <Typography fontSize={ 39 } fontWeight="light">10 de Marzo, 2025</Typography>
        </Grid2>
        <Grid2 item>
            <Button color="primary" sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid2>
        <Grid2 container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un titulo"
                label="Título"
                sx={{ border: "none", mb: 1 }}
            />
            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Que sucedio en el dia de hoy?"
                minRows={ 5 }
            />
        </Grid2>

        <ImageGallery />
    </Grid2>
  )
}
