import { test, expect } from "../support/index.js";
import { faker } from "@faker-js/faker";

test("deve cadastrar um lead na fila de espera", async ({ page }) => {
  const leadName = faker.person.firstName();
  const leadEmail = faker.internet.email();
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(leadName, leadEmail);
  await page.toast.containText(/Agradecemos por compartilhar seus dados/);
});

test("não deve cadastrar quando o email ja existe", async ({ page, request }) => {
  const leadName = faker.person.firstName();
  const leadEmail = faker.internet.email();
  
  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail,
    },
  });

  expect(newLead.ok()).toBeTruthy();

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(leadName, leadEmail);
  await page.toast.containText(
    "O endereço de e-mail fornecido já está registrado em nossa fila de espera."
  );
});

test("nao deve cadastrar com um email incorreto", async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm("Patrick", "patrick.com");

  await page.leads.alertHaveText("Email incorreto");
});

test("nao deve cadastrar quando o nome não é preenchido", async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm("", "patrick@teste.com");

  await page.leads.alertHaveText("Campo obrigatório");
});

test("nao deve cadastrar quando o email não é preenchido", async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm("Patrick", "");

  await page.leads.alertHaveText("Campo obrigatório");
});

test("nao deve cadastrar quando nenhum campo é preenchido", async ({
  page,
}) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm("", "");

  await page.leads.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
});
