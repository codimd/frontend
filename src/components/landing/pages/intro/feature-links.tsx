import {Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans} from "react-i18next";
import React from "react";
import { Link } from "react-router-dom";

const FeatureLinks: React.FC = () => {
    return (
        <Row className="mb-5">
            <Col md={4} className="inner">
                <Link to={"/features#Share-Notes"} className="text-light">
                    <FontAwesomeIcon icon="bolt" size="3x"/>
                    <h5>
                        <Trans i18nKey="featureCollaboration"/>
                    </h5>
                </Link>
            </Col>
            <Col md={4} className="inner">
                <Link to={"/features#MathJax"} className="text-light">
                    <FontAwesomeIcon icon="chart-bar" size="3x"/>
                    <h5>
                        <Trans i18nKey="featureMathJax"/>
                    </h5>
                </Link>
            </Col>
            <Col md={4} className="inner">
                <Link to={"/features#Slide-Mode"} className="text-light">
                    <FontAwesomeIcon icon="tv" size="3x"/>
                    <h5>
                        <Trans i18nKey="featureSlides"/>
                    </h5>
                </Link>
            </Col>
        </Row>
    );
}

export { FeatureLinks }
