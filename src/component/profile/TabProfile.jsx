import React from "react";
import PropTypes from "prop-types";
import "../../styles/component/profile/nav-profile-comp.scss";
import { tabsProfilePage } from "../../utils/links";

const TabProfile = ({ activeTab, setActiveTab }) => {
  return (
    <div className="note-nav">
      <ul>
        {tabsProfilePage.map((tab) => (
          <li
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`nav ${activeTab === tab.id ? "active" : ""}`}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

TabProfile.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired,
};

export default TabProfile;
