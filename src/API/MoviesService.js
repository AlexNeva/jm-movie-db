export default class MoviesService {

  API_KEY = '7d69d7ca3c0fc515994ec1af1752bd66';

  API_BASE = `https://api.themoviedb.org/3/`;

  async getResource(url) {
    const res = await fetch(`${this.API_BASE}${url}`);

    if (!res.ok) {
      throw new Error('404')
    }

    return res.json();
  }

  getTermsMovies(term, pageNumber) {
    return this.getResource(`search/movie?api_key=${this.API_KEY}&query=${term}&page=${pageNumber}`)
  }

  getGenres() {
    return this.getResource(`genre/movie/list?api_key=${this.API_KEY}&language=en-US`)
  }

}