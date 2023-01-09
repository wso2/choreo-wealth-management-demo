import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import {Accordion, Col} from "react-bootstrap";

export const SkeletonTransaction = () => {
  return (
    <SkeletonTheme baseColor="#EEEEEE" highlightColor="#FFFFFF">
      <Accordion.Item>
        <Accordion.Header>
          <Col><Skeleton width={"40%"} /></Col>
          <Col><Skeleton width={"20%"} /></Col>
          <Col><Skeleton width={"20%"} /></Col>
          <Col><Skeleton width={"40%"} /></Col>
        </Accordion.Header>
      </Accordion.Item>
    </SkeletonTheme>  
  );
};
