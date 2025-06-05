import {expect} from '@playwright/test';

export class Tvshows {
    constructor(page) {
        this.page = page;
    }

    async goForm() {
        await this.page.locator('a[href="/admin/tvshows"]').click();
        await this.page.locator('a[href$="register"]').click();
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click();
    }
};