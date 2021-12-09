export default class SessionService {

  API_KEY = '7d69d7ca3c0fc515994ec1af1752bd66';


  API_BASE = `https://api.themoviedb.org/3/`;



  async getResource(url) {
    const res = await fetch(`${this.API_BASE}${url}`);

    if (!res.ok) {
      throw new Error('404')
    }

    return res.json();
  }

  createSession() {
    return this.getResource(`authentication/guest_session/new?api_key=${this.API_KEY}`)
  }


  // async getSessionId() {
  //   const res = await this.createSession()
  //   const sessionId = res.guest_session_id;

  //   return sessionId
  // }

  getRatedFilms(sessionId) {
    // const sessionId = await this.getSessionId();

    return this.getResource(`guest_session/${sessionId}/rated/movies?api_key=${this.API_KEY}&language=en-US&sort_by=created_at.asc`)
  }

  async postMovieRating(sessionId, movieId, rating) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${this.API_KEY}&guest_session_id=${sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        "value": rating
      })
    })

    return res
  }

}