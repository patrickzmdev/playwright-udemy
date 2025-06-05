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

    async createTvShow(tvshow) {
        await this.goForm();
        await this.page.getByLabel("Titulo da série").fill(tvshow.title);
        await this.page.getByLabel("Sinopse").fill(tvshow.overview);
        await this.page.locator('#select_company_id .react-select__indicator').click();
        await this.page.locator('.react-select__option').filter({hasText: tvshow.company}).click();
        await this.page.locator('#select_year .react-select__indicator').click();
        await this.page.locator('.react-select__option').filter({hasText: tvshow.release_year}).click();
        await this.page.locator("Temporadas")
    }
};