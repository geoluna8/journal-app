import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'dvhmvwblp',
    api_key: '596989574738628',
    api_secret: 'QwQyaolJZiXbAWSteHLNz2DqSgc',
    secure: true,
});

describe('Pruebas en fileUpload.js', () => {
    
    test('debe subir el archivo correctamente a cloudinary', async() => {

        const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg/960px-Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length -1 ].replace('.jpg', '');

        const cloudResponse = await cloudinary.api.delete_resources([ imageId ], {
            resource_type: 'image'
        });
        // console.log({ cloudResponse });

    });

    test('debe de retornar null', async()=> {

        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );
        expect( url ).toBe(null);

    });
    
});
