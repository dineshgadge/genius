const React = require('react');
const SongActions = require('../../actions/song_actions');
const SongsIndexItem = require('../song/songs_index_item');
const SongStore = require('../../stores/song_store')

const SearchBar = React.createClass({
  getInitialState() {
    return {
      query: "",
      results: SongStore.searchResults(),
      searching: false
    };
  },

  componentDidMount(){
    this.resultsListener = SongStore.addListener(this._onSongsChange);
  },

  componentWillUnmount(){
    this.resultsListener.remove();
  },

  _onSongsChange(){
    this.setState({ results: SongStore.searchResults() });
  },

  handleChange(e){
    e.preventDefault();
    if (e.target.value) {
      SongActions.fetchSongsByQuery(e.target.value);
      this.setState({ searching: true });
    } else {
      this.setState({ searching: false });
    }
    this.setState({ query: e.target.value });
  },

  handleSelect(e){
    e.preventDefault();
    this.setState({
      query: e.target.textContent,
      searching: false
    });
  },

  render(){
    let results = [];
    let className = "search-bar";

    if (this.state.searching) {
      results = this.state.results.map(result => {
        return <SongsIndexItem key={result.id} song={result} />
      });

      className = "search-bar-selected";
    }

    return(
      <div className={className} onClick={this.handleSelect}>
        <input type="text"
               placeholder="Search songs and artists"
               onFocus={ (e) => e.target.placeholder = "" }
               onBlur={
                 (e) => e.target.placeholder = "Search for songs and artists"
               }
               value={this.state.query}
               onChange={this.handleChange}/>
        <div className="search-results">
          <ul>
            {results}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = SearchBar;
