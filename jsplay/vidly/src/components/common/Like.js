import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
library.add(faHeartRegular, faHeartSolid);

export default class Like extends Component {
  render() {
    return this.toggleHeart();
  }
  toggleHeart = () => {
    let liked = (
      <FontAwesomeIcon onClick={this.props.onClick} icon={["fas", "heart"]} />
    );
    let unliked = (
      <FontAwesomeIcon onClick={this.props.onClick} icon={["far", "heart"]} />
    );
    return this.props.liked ? liked : unliked;
  };
}
