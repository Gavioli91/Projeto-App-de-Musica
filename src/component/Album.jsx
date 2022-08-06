import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    music: [],
    loading: true,
  }

  componentDidMount() {
    this.getSingle();
  }

  getSingle = async () => {
    const { match: { params: { id } } } = this.props;
    const single = await getMusics(id);
    this.setState({
      music: single,
      loading: false,
    });
  }

  render() {
    const { music, loading } = this.state;
    const singleIndex = music.filter((single) => single.kind === 'single');
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? (<Loading />) : (
          <div>
            <div>
              <img
                src={ music[0].artworkUrl100 }
                alt={ music[0].collectionName }
                id={ music[0].collectionName }
              />
              <p data-testid="album-name">{ music[0].collectionName }</p>
              <p data-testid="artist-name">{ music[0].artistName }</p>
            </div>
            <div>
              { singleIndex.map((single) => {
                const { trackId, trackName, previewUrl } = single;
                return (
                  <MusicCard
                    trackId={ trackId }
                    key={ trackId }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}
Album.propTypes = { match: PropTypes.shape({
  params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired }).isRequired,
};
export default Album;
