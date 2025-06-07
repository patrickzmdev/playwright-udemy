import { expect } from "@playwright/test";

export class Tvshows {
  constructor(page) {
    this.page = page;
  }

  async goForm() {
    await this.page.locator('a[href="/admin/tvshows"]').click();
    await this.page.locator('a[href$="register"]').click();
  }

  async submit() {
    await this.page.getByRole("button", { name: "Cadastrar" }).click();
  }

  async createTvShow(tvshow) {
    await this.goForm();
    await this.page.getByLabel("Titulo da série").fill(tvshow.title);
    await this.page.getByLabel("Sinopse").fill(tvshow.overview);
    await this.page
      .locator("#select_company_id .react-select__indicator")
      .click();
    await this.page
      .locator(".react-select__option")
      .filter({ hasText: tvshow.company })
      .click();
    await this.page.locator("#select_year .react-select__indicator").click();
    await this.page
      .locator(".react-select__option")
      .filter({ hasText: tvshow.release_year })
      .click();
    await this.page.getByLabel("Temporadas").fill(tvshow.seasons);
    await this.page.locator(".react-switch").click();

    await this.submit();
  }

  async removeTvShow(tvshow) {
    await this.page.locator('a[href="/admin/tvshows"]').click();
    await this.page
      .getByRole("row", { name: tvshow.title })
      .locator(".request-removal")
      .click();
    await this.page.click(".confirm-removal");
  }

  async alertHaveText(target) {
    await expect(this.page.locator(".alert")).toHaveText(target);
  }

  async tableHave(content) {
    const rows = this.page.getByRole("row");
    await expect(rows).toContainText(content);
  }

  async search(target) {
    await this.page.locator('a[href="/admin/tvshows"]').click();
    await this.page.getByPlaceholder("Busque pelo nome").fill(target);
    await this.page.locator(".actions button").click();
  }
}
