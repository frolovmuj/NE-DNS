import { FC } from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonCard: FC = () => (
  <ContentLoader
    speed={0.8}
    width={280}
    height={500}
    viewBox="0 60 280 519"
    backgroundColor="#f3f3f3"
    foregroundColor="#c7c7c7">
    <rect x="0" y="0" width="280" height="300" />
    <rect
      x="0"
      y="325"
      rx="18"
      ry="25"
      width="280"
      height="35"
    />
    <rect
      x="4"
      y="375"
      rx="30"
      ry="30"
      width="274"
      height="88"
    />
    <rect
      x="0"
      y="474"
      rx="10"
      ry="10"
      width="105"
      height="45"
    />
    <rect
      x="130"
      y="474"
      rx="27"
      ry="27"
      width="150"
      height="45"
    />
  </ContentLoader>
);

export default SkeletonCard;
