import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';



describe('Cidades - Create', () => {



it('Criar regristro', async () => {




const res1 = await testServer.post('/cidades')
.send({cidade: 'Palhoça'});

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

   });


it('Tentar criar um registro com nome muito curto', async () => {

    const res1 = await testServer.post('/cidades')
    .send({cidade: 'P'});
    
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    
       });




});

describe('Cidades - DeleteBydId', () => {
   
    it('Apaga registro', async () => {
   
        const res1 = await testServer
        .post('/cidades')
        .send({cidade : 'Palhoça'});

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
        .delete(`/cidade/${res1.body}`)
        .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
     
    });

    it('Tentar apagar registro inexistente', async () => {

        const res1 = await testServer
        .delete('/cidade/99999')
        .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    })


});