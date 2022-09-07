import React, { useEffect, useRef, useState } from "react";
import "./features.css";
import { useGlobal } from "../../context/global-states.provider";
import LongMenu from "./long-menu";
import { useApi } from "../../context/api-provider";
const FeatureCard = ({ title, handelOpen, feature, configurations }) => {
  const { getDetails } = useGlobal();
  const { getVechicleFeature, role, header, reset } = useApi();
  const [details, setDetails] = useState("");

  const { getMonroneyFeature } = useApi();
  const { selectFeature, titleCase } = useGlobal();

  const handelClick = () => {
    selectFeature(feature.title);
    getVechicleFeature(feature.title);
    handelOpen();
    title === "Pricing" && getMonroneyFeature(title);
    reset();
  };
  const ref = useRef(true);
  useEffect(() => {
    if (ref.current) {
      ref.current = false;
    }
    getDetails(feature, setDetails);
  }, [feature]);

  return (
    <div class="feature-card__wrapper">
      <div className="feature-card__header  d-flex align-items-center">
        {feature.title}
        {role.role === "ADMIN" && (
          <div className="header-icon ms-auto">
            {configurations?.length > 0 &&
              configurations.map((sec) => {
                return (
                  <>
                    <LongMenu
                      openModel={handelClick}
                      featureTitle={titleCase(feature?.title)}
                      secName={titleCase(sec?.section_name)}
                      Edit={sec?.is_edit === "Editable" ? true : false}
                    />
                  </>
                );
              })}
          </div>
        )}
      </div>
      {feature.title !== "Pricing" ? (
        <div className="feature-card__body">{details}</div>
      ) : (
        <div className="feature-card__body">
          <ul>
            <li class="pricing-card__body">
              <div>
                <span class="pricing-card__body--description">
                  {feature.features.list_price_text_description}
                </span>
                <br></br>
                {/* <span style= {{ 'padding-left': '0.5rem', 'display': 'block' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
            in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.</span> */}
              </div>
              <div class="pricing-card__body--price">
                ${feature.features.list_price}
              </div>
            </li>
            {feature.features.specialItems &&
              feature.features.specialItems.map((el) => {
                return (
                  <li class="pricing-card__body" style={{ margin: "1rem 0" }}>
                    <div class="pricing-card__body--description">
                      {el.title}
                    </div>
                    <div class="pricing-card__body--price">${el.price}</div>
                  </li>
                );
              })}
            <hr></hr>
            <li class="pricing-card__body">
              <div class="pricing-card__body--description">
                Total Suggested Retail Price:
              </div>
              <div class="pricing-card__body--price">${feature.total}</div>
            </li>
          </ul>
        </div>
      )}

      {feature.title === "Join the Conversation" && (
        <div className="disclaimer w-100">
          <p>{header?.disclaimer}</p>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
