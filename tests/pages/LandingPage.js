import { expect } from "@playwright/test";

export class LandingPage {
  constructor(page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto("http://localhost:3000/");
  }

  async openLeadModal() {
    await this.page.getByRole("button", { name: /Aperte o play/ }).click();

    await expect(this.page.locator(".customModal h2")).toHaveText(
      "Fila de espera"
    );
  }

  async submitLeadForm(name, email) {
    await this.page.locator('input[placeholder="Informe seu nome"]').fill(name);

    await this.page
      .locator('input[placeholder="Informe seu email"]')
      .fill(email);

    await this.page
      .getByRole("button", { name: "Quero entrar na fila!" })
      .click();
  }

  async alertHaveText(target) {
    await expect(this.page.locator(".alert")).toHaveText(target);
  }
}
