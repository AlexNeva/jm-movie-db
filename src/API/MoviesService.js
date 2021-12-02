export default class MoviesService {

  API_KEY = '7d69d7ca3c0fc515994ec1af1752bd66';

  API_BASE = `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}`;

  async getResource(url) {
    const res = await fetch(`${this.API_BASE}${url}`);

    return res.json();
  }

  getTermsMovies(term) {
    return this.getResource(`&query=${term}`)
  }
}