import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { Toast } from "../pages/Components.js";
import { MoviesPage } from "../pages/MoviesPage.js";
import { LandingPage } from "../pages/LandingPage.js";

const test = base.extend({
  page: async ({ page }, use) => {
    await use({
        ...page,
        landing: new LandingPage(page),
        login: new LoginPage(page),
        toast: new Toast(page),
        movies: new MoviesPage(page),
    });
  },
});

export {test, expect};
