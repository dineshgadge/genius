const React = require('react');
const SongStore = require('../../stores/song_store');
const SongActions = require('../../actions/song_actions');
const ErrorStore = require('../../stores/error_store');
const hashHistory = require('react-router').hashHistory;

const SongForm = React.createClass({
  getInitialState() {
    return {
      artist: "",
      title: "",
      lyrics: "",
      youtubeUrl: "",
      soundcloudUrl: "",
      featuring: "",
      producedBy: "",
      writtenBy: "",
      releaseDate: "",
      about: "",
      submitting: false,
      errors: {}
    };
  },

  componentDidMount(){
    this.songListener = SongStore.addListener(this._onSongChange);
    this.errorListener = ErrorStore.addListener(this._onErrorChange);
  },

  componentWillUnmount(){
    this.songListener.remove();
    this.errorListener.remove();
  },

  _onSongChange(){
    const song = SongStore.latestAdded();
    this.props.closeModal();
    hashHistory.push("songs/" + song.id);
    this.songListener.remove();
  },

  _onErrorChange(){
    this.setState({ errors: ErrorStore.formErrors("song") });
    this.setState({ submitting: false });
  },

  receiveChange(e){
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  },

  handleSubmit(e){
    e.preventDefault();
    const song = {
      artist: this.state.artist,
      title: this.state.title,
      lyrics: this.state.lyrics,
      youtube_url: this.state.youtubeUrl,
      soundcloud_url: this.state.soundcloudUrl,
      featuring: this.state.featuring,
      produced_by: this.state.producedBy,
      written_by: this.state.writtenBy,
      release_date: this.state.releaseDate,
      about: this.state.about
    };
    SongActions.createSong(song, "song");
    this.setState({ submitting: true });
  },

  render() {
    return (
      <div className="song-form-container">
        <h3>add song</h3>
        <form className="song-form" onSubmit={this.handleSubmit}>
          <label>
            By
            <p className="form-error">{this.state.errors.artist}</p>
            <input type="text"
                   value={this.state.artist}
                   name="artist"
                   onChange={this.receiveChange}/>
          </label>
          <label>
            Title
            <p className="form-error">{this.state.errors.title}</p>
            <input type="text"
                   value={this.state.title}
                   name="title"
                   onChange={this.receiveChange}/>
          </label>
          <label>
            <p>Lyrics</p>
            <p className="form-error">{this.state.errors.lyrics}</p>
            <textarea onChange={this.receiveChange}
                      name="lyrics"
                      defaultValue={this.state.lyrics} />
          </label>
          <label>
            <p>About</p>
            <p className="form-error">{this.state.errors.about}</p>
            <textarea onChange={this.receiveChange}
                      name="about"
                      defaultValue={this.state.about} />
          </label>
          <label>
            <p>Featuring</p>
            <input type="text"
                   value={this.state.featuring}
                   name="featuring"
                   onChange={this.receiveChange}/>
          </label>
          <label>
            Produced By
            <input type="text"
                   value={this.state.producedBy}
                   name="producedBy"
                   onChange={this.receiveChange}/>
          </label>
          <label>
            Written By
            <input type="text"
                   value={this.state.writtenBy}
                   name="writtenBy"
                   onChange={this.receiveChange}/>
          </label>
          <label>
            Soundcloud URL
            <input type="text"
                   value={this.state.soundcloudUrl}
                   name="soundcloudUrl"
                   onChange={this.receiveChange}/>
          </label>
          <label>
            YouTube URL
            <input type="text"
                   value={this.state.youtubeUrl}
                   name="youtubeUrl"
                   onChange={this.receiveChange}/>
          </label>
          <label>
            Release Date
            <input type="date"
                   value={this.state.releaseDate}
                   name="releaseDate"
                   className="date"
                   onChange={this.receiveChange}/>
          </label>

          <input type="submit"
                 value="Submit"
                 className="submit"
                 disabled={this.state.submitting}/>
        </form>
      </div>
    );
  }

});

module.exports = SongForm;
