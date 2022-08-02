import React from 'react';
import Header from './Header';

class Search extends React.Component {
  state = {
    btnDisabled: true,
    searchArtist: '',
  }

  btnInput = ({ index }) => {
    const { artist, field } = index;
    this.setState({
      [artist]: field,
    }, () => {
      const { searchArtist } = this.setState;
      if (searchArtist.length >= TWO_CHARACTERS) {
        this.setState({ btnDisabled: false });
      }
    });
  };

  fillField = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.btnInput);
  }

  render() {
    const { btnDisabled, searchArtist } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            name="searchArtist"
            value={ searchArtist }
            onChange={ this.fillField }
          />
          <input
            type="text"
            data-testid="search-artist-button"
            disabled={ btnDisabled }
            Search
          />
        </form>
      </div>
    );
  }
}

export default Search;
