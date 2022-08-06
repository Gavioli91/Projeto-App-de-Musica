import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = { btnDisabled: true,
    searchArtist: '',
    music: [],
    artist: '',
    loading: false,
  };

  btnInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      const { artist } = this.state;
      if (artist.length > 1) {
        this.setState({ btnDisabled: false });
      }
    });
  };

  searchMusic = () => {
    const { artist } = this.state;
    this.setState({ loading: true, searchArtist: artist },
      async () => {
        const music = await searchAlbumsAPI(artist);
        this.setState({ music, artist: '', loading: false });
      });
  }

  render() {
    const { btnDisabled, searchArtist, music, artist, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              name="artist"
              value={ artist }
              onChange={ this.btnInput }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ btnDisabled }
              onClick={ this.searchMusic }
            >
              Pesquisar
            </button>
          </form>
        )}
        <div>
          {!music.length ? 'Nenhum álbum foi encontrado' : (
            <div>
              <p>{`Resultado de álbuns de: ${searchArtist}`}</p>
              {music.map(({ artistName, collectionId, collectionName, collectionPrice,
                artworkUrl100,
                releaseDate,
                trackCount,
              }) => (
                <div key={ collectionId }>
                  <img src={ artworkUrl100 } alt={ artistName } />
                  <p>{ artistName }</p>
                  <p>{ collectionPrice }</p>
                  <p>{ releaseDate }</p>
                  <p>{ trackCount }</p>
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    {collectionName}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
