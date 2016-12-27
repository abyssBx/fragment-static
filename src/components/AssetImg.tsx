import * as React from "react";
import { merge } from "lodash";

export default class AssetImg extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  render() {
    const { size, type, width, height, marginTop, style } = this.props

    const _style = {
      width: size || width,
      height: size || height,
      marginTop: marginTop,
    }

    return (
      <img src={require(`../../assets/img/${type}.png`)} style={merge(_style, style)}/>
    )
  }
}
