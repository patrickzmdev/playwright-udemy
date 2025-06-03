import {test, expect} from '../support/index.js';
import { executeSQL } from '../support/database.js';

const data = require('../support/fixtures/movies.json');

test('deve poder cadastrar um novo filme', async ({page}) => {

    const movie = data.create

    await executeSQL(`DELETE from movies m where title = '${movie.title}'`);

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.createMovie(movie);
    await page.toast.containText('Cadastro realizado com sucesso!');
});

test('não deve cadastrar quando o título é duplicado', async ({page, request}) => {

    const movie = data.duplicate

    await request.api.setToken();


    // await executeSQL(`DELETE from movies m where title = '${movie.title}'`);

    // await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    // await page.movies.createMovie(movie);
    // await page.toast.containText('Este conteúdo já encontra-se cadastrado no catálogo');
});

test('não deve cadastrar quando os campos obrigatórios não forem preenchidos', async ({page}) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.goForm();
    await page.movies.submit();

    await page.movies.alertHaveText([
        "Por favor, informe o título.",
        "Por favor, informe a sinopse.",
        "Por favor, informe a empresa distribuidora.",
        "Por favor, informe o ano de lançamento."
    ]);
});