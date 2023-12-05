import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
const IconRecast = (props: SvgProps) => (
  <Svg width={15} height={16} fill="none" {...props}>
    <G fill="#616164" clipPath="url(#a)">
      <Path d="M13.617 14.783a.717.717 0 0 1-.717-.717V11.2h-2.867a.717.717 0 0 1 0-1.433h3.584a.717.717 0 0 1 .716.717v3.583a.717.717 0 0 1-.716.717ZM4.3 6.899H.717A.717.717 0 0 1 0 6.183V2.599a.717.717 0 0 1 1.433 0v2.867H4.3a.717.717 0 1 1 0 1.433Z" />
      <Path d="M7.167 15.5A7.167 7.167 0 0 1 .043 9.129a.721.721 0 0 1 1.434-.158 5.733 5.733 0 0 0 11.108 1.275.715.715 0 0 1 1.178-.327.717.717 0 0 1 .17.808A7.167 7.167 0 0 1 7.166 15.5Zm6.407-7.167a.717.717 0 0 1-.717-.638A5.734 5.734 0 0 0 1.763 6.42a.717.717 0 1 1-1.347-.48 7.167 7.167 0 0 1 13.882 1.59.717.717 0 0 1-.63.789l-.094.014Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .5h15v15H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default IconRecast;
