import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";
const IconActiveBadge = (props: SvgProps) => (
  <Svg width={15} height={14} fill="none" {...props}>
    <Rect width={14} height={14} x={0.711} fill="#8565CB" rx={7} />
    <Path
      fill="#fff"
      d="M6.254 2.625c.223 0 .424.136.507.343l2.41 6.023.95-2.377a.548.548 0 0 1 .508-.343h2.37a.547.547 0 0 1 0 1.094h-2l-1.32 3.301a.547.547 0 0 1-1.016 0l-2.41-6.021-.95 2.377a.547.547 0 0 1-.507.343h-2.37a.547.547 0 1 1 0-1.094h2l1.32-3.303a.548.548 0 0 1 .508-.343Z"
    />
  </Svg>
);
export default IconActiveBadge;
