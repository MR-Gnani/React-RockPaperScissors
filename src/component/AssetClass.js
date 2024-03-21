import React, { Component } from 'react'

export default class AssetClass extends Component {
    constructor(){
        super();
        this.item="";
    }

  render() {
    return (
      <div className='assetContent'>
      Game Coin : {this.props.item}
    </div>
    )
  }
}
