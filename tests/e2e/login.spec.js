import {test , expect} from "../support/index.js";

test('deve logar como administrador', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', 'pwd123');
    await page.login.isLoggedIn('Admin');
});

test('não deve logar com senha incorreta', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', 'abc123');

    const message = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.";
    await page.toast.containText(message);
});

test('não deve logar quando o email não é invalido', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('www.patrick.com', 'abc123');
    await page.login.alertHaveText('Email incorreto');
});

test('não deve logar quando o email não é prenchido', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('', 'abc123');
    await page.login.alertHaveText('Campo obrigatório');
});

test('não deve logar quando a senha não é prenchida', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('patrick@teste.com', '');
    await page.login.alertHaveText('Campo obrigatório');
});

test('não deve logar quando a nenhum campo é prenchido', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('', '');
    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório']);
});