import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
    state= { favoriteMusic: [], loading: false }

    async componentDidMount() {
      this.setState({
        favoriteMusic: await getFavoriteSongs(),
      });
    }

      adicionarMusicaAosFavoritos = () => {
        this.setState({ loading: true },
          async () => {
            await addSong({ ...this.props });
            const { favoriteMusic } = this.state;
            this.setState({ favoriteMusic: [...favoriteMusic, this.props],
              loading: false });
          });
      }

      render() {
        const { trackName, previewUrl, trackId } = this.props;
        const { favoriteMusic, loading } = this.state;
        if (loading) {
          return <Loading />;
        }
        const cancaoFavorita = favoriteMusic.some((single) => trackId === single.trackId);
        return (
          <div>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
            </audio>
            <label htmlFor="favoriteCheckbox">
              <input
                type="checkbox"
                id="favoriteCheckbox"
                data-testid={ `checkbox-music-${trackId}` }
                checked={ cancaoFavorita }
                onChange={ this.adicionarMusicaAosFavoritos }
              />
            </label>
          </div>
        );
      }
}
MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
export default MusicCard;
