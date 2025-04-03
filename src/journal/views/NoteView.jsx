import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid2, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "./ImageGallery"
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef } from "react";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

  const dispatch = useDispatch();

  const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );

  const { body, title, onInputChange, formState, date } = useForm( note );

  const dateString = useMemo(() => {
    const newDate = new Date( date );
    return newDate.toUTCString();
  }, [ date ]);

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch( setActiveNote( formState ) );
  }, [ formState ]);

  useEffect(() => {
    if ( messageSaved.length > 0 ) {
        Swal.fire({
            title: 'Nota actualizada',
            text: messageSaved,
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    }
  }, [ messageSaved ]);

  const onSaveNote = () => {
    dispatch( startSaveNote() );
  }

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    
    console.log("subiendo archivos");
    dispatch( startUploadingFiles( target.files ) );
  }

  const onDelete = () => {
    dispatch( startDeletingNote() );
  }
    
  return (
    <Grid2
        className="animate__animated animate__fadeIn animate__faster"
        container
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 1 }}
        alignItems="center"
    >
        <Grid2 item>
            <Typography fontSize={ 39 } fontWeight="light">{ dateString }</Typography>
        </Grid2>
        <Grid2 item>

            <input
                type="file"
                multiple
                ref={ fileInputRef}
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
            />

            <IconButton
                color="primary"
                disabled={ isSaving }
                onClick={ () => fileInputRef.current.click() }
            >
                <UploadOutlined />
            </IconButton>

            <Button
                disabled={ isSaving }
                color="primary"
                sx={{ padding: 2 }}
                onClick={ onSaveNote }
            >
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
                name="title"
                value={ title }
                onChange={ onInputChange }
            />
            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Que sucedio en el dia de hoy?"
                minRows={ 5 }
                name="body"
                value={ body }
                onChange={ onInputChange }
            />
        </Grid2>

        <Grid2 container justifyContent="end">
            <Button
                onClick={ onDelete }
                sx={{ mt: 2 }}
                color="error"
            >
                <DeleteOutline />
                Borrar
            </Button>
        </Grid2>

        <ImageGallery
            images={ note.imageUrls }
        />
    </Grid2>
  )
}
