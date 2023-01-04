import { StatusCodes } from "http-status-codes";
import { testServer } from "./../jest.setup";

describe("Cidades - Create", () => {
    it("Criar regristro", async () => {
        const res1 = await testServer
            .post("/cidades")
            .send({ cidade: "Palhoça" });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
    });

    it("Tentar criar um registro com nome muito curto", async () => {
        const res1 = await testServer.post("/cidades").send({ cidade: "P" });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.nome");
    });
});

describe("Cidades - DeleteBydId", () => {
    it("Apaga registro", async () => {
        const res1 = await testServer
            .post("/cidades")
            .send({ cidade: "Palhoça" });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/cidade/${res1.body}`)
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it("Tentar apagar registro inexistente", async () => {
        const res1 = await testServer.delete("/cidade/99999").send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });
});

describe("Cidades - GetAll", () => {
    it("Buscar todos os regristros", async () => {
        const res1 = await testServer.post("/cidades").send();

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer.get("/cidades").send();

        expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});

describe("Cidades -GetById", () => {
    it("Busca registro por id", async () => {
        const res1 = await testServer
            .post("/cidades")
            .send({ cidade: "Palhoça" });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer.get(`/cidades/${res1.body}`).send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty("cidade");
    });

    it("tenta buscar registro que não existe", async () => {
        const res1 = await testServer.get("/cidades/9999").send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("erros.default");
    });
});

describe("Cidades - UpdateById", () => {
    it("Atualiza registro", async () => {
        const res1 = await testServer
            .post("/cidade")
            .send({ cidade: "Palhoça" });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .send({ nome: "Florianópolis" });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it("Tenta atualizar registro que não existe", async () => {
        const res1 = await testServer
            .put("/cidades/99999")
            .send({ cidade: "Palhoça" });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });
});
