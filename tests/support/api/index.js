require("dotenv").config();
import { expect } from "@playwright/test";
import { release } from "os";
import { title } from "process";

export class Api {
  constructor(request) {
    this.baseAPI = process.env.BASE_API
    this.request = request;
    this.token = undefined;
  }

  async setToken() {
    const response = await this.request.post(`${this.baseAPI}/sessions`, {
      data: {
        email: "admin@zombieplus.com",
        password: "pwd123",
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = JSON.parse(await response.text());

    this.token = body.token;

    console.log("Token: ", this.token);
  }

  async getCompanyIdByName(name) {

    const response = await this.request.get(
      `${this.baseAPI}/companies`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        params: {
          name: name,
        },
      }
    );
    expect(response.ok()).toBeTruthy();

    const body = JSON.parse(await response.text());

    return body.data[0].id;
  }

  async postMovie(movie) {
    const companyId = await this.getCompanyIdByName(movie.company);

    const response = await this.request.post(`${this.baseAPI}/movies`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        ContentType: "multipart/form-data",
        Accept: "application/json, text/plain, */*",
      },
      multipart: {
        title: movie.title,
        overview: movie.overview,
        company_id: companyId,
        release_year: movie.release_year,
        featured: movie.featured,
      },
    });
    expect(response.ok()).toBeTruthy();
  }

  async postTvShow(tvshow) {
    const companyId = await this.getCompanyIdByName(tvshow.company);

    const response = await this.request.post(`${this.baseAPI}/tvshows`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        ContentType: "multipart/form-data",
        Accept: "application/json, text/plain, */*",
      },
      multipart: {
        title: tvshow.title,
        overview: tvshow.overview,
        company_id: companyId,
        release_year: tvshow.release_year,
        seasons: tvshow.seasons,
        featured: tvshow.featured,
      },
    });
    expect(response.ok()).toBeTruthy();
  }
}
