var dispatcher = require('../dispatcher');
var actionTypes = require('../actions/actionTypes');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var state = {
	movies: [],
	movie: {}
};


var MoviesStore = _.assign({}, EventEmitter.prototype, {
	getState: function () {
		return state;
	},

	emitChange: function () {
		this.emit('change');
	},

	addChangeListener: function (callback) {
		this.on('change', callback);
	},

	removeChangeListener: function (callback) {
		this.removeListener('change', callback);
	}
});

dispatcher.register(function (action) {
	switch (action.actionType) {
		case actionTypes.FETCH_MOVIES:
			state.movies = action.movies;
			break;
		case actionTypes.FIND_MOVIE:
			state.movie = action.movie;
			break;
		default:
			return true;
	}

	MoviesStore.emitChange();

	return true;
});

module.exports = MoviesStore;
