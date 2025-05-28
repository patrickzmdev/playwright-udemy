import {test, expect} from '../support/index.js';
import { executeSQL } from '../support/database.js';

const data = require('../support/fixtures/movies.json');

test('deve poder cadastrar um novo filme', async ({page}) => {

    const movie = data.create

    await executeSQL(`DELETE from movies m where title = '${movie.title}'`);

    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', 'pwd123');
    await page.movies.isLoggedIn();
    await page.movies.createMovie(movie.title, movie.overview, movie.company, movie.release_year);
    await page.toast.containText('Cadastro realizado com sucesso!');
});