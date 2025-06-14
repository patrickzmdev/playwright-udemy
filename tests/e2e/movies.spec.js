import {test, expect} from '../support/index.js';
import { executeSQL } from '../support/database.js';

const data = require('../support/fixtures/movies.json');

test.beforeAll(async () => {
    await executeSQL(`DELETE from movies`);
});

test('deve poder cadastrar um novo filme', async ({page}) => {

    const movie = data.create

    await executeSQL(`DELETE from movies m where title = '${movie.title}'`);

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.createMovie(movie);
    await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`);
});

test('deve poder remover um filme', async ({page, request}) => {

    const movie = data.to_remove
    await request.api.postMovie(movie);

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.movies.remove(movie.title);
    await page.popup.haveText('Filme removido com sucesso.');

});

test('não deve cadastrar quando o título é duplicado', async ({page, request}) => {

    const movie = data.duplicate

    await request.api.postMovie(movie);
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.movies.createMovie(movie);
    await page.popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`);
});

test('não deve cadastrar quando os campos obrigatórios não forem preenchidos', async ({page}) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.goForm();
    await page.movies.submit();

    await page.movies.alertHaveText([
        "Campo obrigatório",
        "Campo obrigatório",
        "Campo obrigatório",
        "Campo obrigatório"
    ]);
});

test('deve realizar busca pelo termo zumbi', async ({page, request}) => {
    const movies = data.search;

    movies.data.forEach(async (movie) => {
        await request.api.postMovie(movie);
    });

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.search(movies.input);
    await page.movies.tableHave(movies.outputs);

});