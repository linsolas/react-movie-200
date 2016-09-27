import React from 'react';

import MovieForm from './MovieForm';
import * as MovieApi from '../api/MovieApi';

import MoviesStore from '../stores/MoviesStore';
import * as MoviesActionCreator from '../actions/MoviesActionCreator';

export default class Movie extends React.Component {

    static contextTypes = {
        router : React.PropTypes.object
    };

    state = {
        selected : false,
        editing  : false,
        data: {}
    };

    updateMovie = () => {
        this.setState({ data : MoviesStore.state.movie });
    };

    componentWillMount() {
        MoviesStore.addChangeListener(this.updateMovie);
    }

    componentDidMount() {
        this.findMovie();
    }

    componentWillUnmount() {
        MoviesStore.removeChangeListener(this.updateMovie);
    }

    componentDidUpdate(prevProps) {
        const oldId = prevProps.params.id;
        const newId = this.props.params.id;

        if( newId && oldId !== newId ) {
            this.findMovie();
        }
    }

    deleteMovie() {
        MoviesActionCreator.deleteMovie(this.props.params.id);

        this.context.router.replace('/movies');
    }

    findMovie() {
        MoviesActionCreator.findMovie(this.props.params.id);
    }

    onSelect() {
        this.setState({ selected : true });
    }

    openEditionForm() {
        this.setState({ editing : true });
    }

    closeEditionForm() {
        this.setState({ editing : false });
    }

    onCancelModification(event) {
        event.preventDefault();
        this.closeEditionForm();
    }

    renderActionButtons(data) {
        return (
            <div className="pull-right">
                <button className="btn btn-default" onClick={this.openEditionForm.bind(this)}>
                    <i className="glyphicon glyphicon-pencil" />
                </button>
                <button className="btn btn-danger" onClick={() => this.deleteMovie(data.id)}>
                    <i className="glyphicon glyphicon-trash"/>
                </button>
            </div>
        );
    }

    renderForm() {
        return (
            <MovieForm edition={true}
                movie={this.state.data}
                onCancel={this.onCancelModification.bind(this)}
            />
        );
    }

    renderContent() {
        const data = this.state.data,
              afficheUrl = data.poster || 'server/img/no-poster.jpg';
        const actionButtons = this.state.selected ? this.renderActionButtons(data) : null;
        return (
            <div className="row">
                <img src={afficheUrl} className="col-md-3" />
                <div className="caption col-md-9">
                    <h3>{data.title} {actionButtons} </h3>
                    <p><b>Année de sortie : </b>{data.releaseYear}</p>
                    <p><b>Réalisateurs : </b>{data.directors}</p>
                    <p><b>Acteurs : </b>{data.actors}</p>
                    <p><b>Synopsis : </b>{data.synopsis}</p>
                    <p><b>Vu le : </b>{data.lastViewDate}</p>
                    <p><b>Prix : </b>{data.price}</p>
                    <p><b>Note : </b>{data.rate}</p>
                </div>
            </div>

        );
    }

    render() {
        return (
            <div className="col-md-12" onClick={this.onSelect.bind(this)}>
                {this.state.editing ? this.renderForm() : this.renderContent()}
            </div>
        );
    }
}