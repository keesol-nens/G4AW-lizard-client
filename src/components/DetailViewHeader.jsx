import { Map, TileLayer, WMSTileLayer } from "react-leaflet";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import styles from "./styles/DetailViewHeader.css";

import find from "lodash/find";

///////////////////////////////////////////////////////////////////////////////
// The main Component: the DetailViewHeader ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class DetailViewHeader extends Component {
  getComponentClassName(halfMode) {
    const mode = halfMode ? styles.TitleOnlyMode : styles.FullMode;
    return `${styles.DetailViewHeader} ${mode}`;
  }
  render() {
    const {
      title,
      halfMode,
      subTitle,
      handleBackButtonClick,
      latlonzoom,
      headerImage
    } = this.props;

    return (
      <div className={this.getComponentClassName(halfMode)}>
        <DetailViewHeaderTitle
          halfMode={halfMode}
          title={title}
          subTitle={subTitle}
        />
        <DetailViewHeaderBackArrow handleClick={handleBackButtonClick} />
        {headerImage
          ? <DetailViewHeaderImg headerImage={headerImage} />
          : <DetailViewHeaderMap latlonzoom={latlonzoom} />}
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// type-checking for props: ///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

DetailViewHeader.propTypes = {
  fullMode: PropTypes.bool,
  handleBackButtonClick: PropTypes.func,
  headerImage: PropTypes.string,
  latlonzoom: PropTypes.any,
  subTitle: PropTypes.string,
  title: PropTypes.string
};

///////////////////////////////////////////////////////////////////////////////
// Local sub-components: //////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class DetailViewHeaderTitle extends Component {
  render() {
    const { halfMode, title, subTitle } = this.props;
    return (
      <div className={styles.Titles}>
        <p className={styles.Title}>{title}</p>
        {halfMode ? "" : <span className={styles.SubTitle}>{subTitle}</span>}
      </div>
    );
  }
}

class DetailViewHeaderBackArrow extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <div className={styles.ArrowBackIcon} onClick={handleClick}>
        <i className="material-icons">arrow_back</i>
      </div>
    );
  }
}

class DetailViewHeaderImg extends Component {
  render() {
    const { headerImage } = this.props;
    return (
      <div
        className={styles.DetailViewHeaderImg}
        style={{ backgroundImage: `url(${headerImage})` }}
      />
    );
  }
}

class DetailViewHeaderMapComponent extends Component {
  render() {
    const { latlonzoom, getBaselayerUrl } = this.props;
    const { lat, lon, zoom } = latlonzoom;
    return (
      <Map
        ref="mapElement"
        center={[lat, lon]}
        zoom={zoom}
        zoomControl={false}
        style={{ height: "100%", zIndex: -1 }}
      >
        <TileLayer url={getBaselayerUrl()} />
      </Map>
    );
  }
}

/* react-redux coupling ******************************************************/

function mapStateToProps(state) {
  return {
    getBaselayerUrl: () => {
      const activeBaselayer = find(state.baselayer.layers, { active: true });
      return activeBaselayer.url;
    }
  };
}

const DetailViewHeaderMap = connect(mapStateToProps, null)(
  DetailViewHeaderMapComponent
);

export default DetailViewHeader;
