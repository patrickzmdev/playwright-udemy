import {test, expect} from '../support/index.js';
import { executeSQL } from '../support/database.js';

const data = require('../support/fixtures/tvshows.json');

test.beforeAll(async () => {
    await executeSQL(`DELETE from tvshows`);
});

test('deve ser possivel cadastrar uma nova série', async ({ page }) => {

    const tvshow = data.create;

    await executeSQL(`DELETE from tvshows t where title = '${tvshow.title}'`);

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvshows.createTvShow(tvshow);
    await page.popup.haveText(`A série '${tvshow.title}' foi adicionada ao catálogo.`);
});

test('deve poder remover uma série', async ({ page, request }) => {
    const tvshow = data.to_remove;
    await request.api.postTvShow(tvshow);

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvshows.removeTvShow(tvshow);
    await page.popup.haveText(`Série removida com sucesso.`);
});

test('não deve cadastrar quando o título é duplicado', async ({ page, request }) => {
    const tvshow = data.duplicate;

    await request.api.postTvShow(tvshow);
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvshows.createTvShow(tvshow);
    await page.popup.haveText(`O título '${tvshow.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`);   
});

test('não deve cadastrar quando os campos obrigatórios não forem preenchidos', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvshows.goForm();
    await page.tvshows.submit();
    await page.tvshows.alertHaveText([
        "Campo obrigatório",
        "Campo obrigatório",
        "Campo obrigatório",
        "Campo obrigatório",
        "Campo obrigatório (apenas números)"
    ]);
});

test('deve realizar busca pelo termo horror', async ({ page, request }) => {
    const tvshows = data.search;

    tvshows.data.forEach(async (tvshow) => {
        await request.api.postTvShow(tvshow);
    });

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvshows.search(tvshows.input);
    await page.tvshows.tableHave(tvshows.outputs);
});
