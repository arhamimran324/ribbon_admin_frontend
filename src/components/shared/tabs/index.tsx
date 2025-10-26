import React from "react";

import Container from "../container";
import { Typography } from "../typography";

interface Tab {
  id: number;
  title: string;
}

interface TabsProps {
  activeTab: number;
  setActiveTab: (id: number) => void;
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, tabs }) => {
  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  return (
    <div className="py-4">
      {/* Tabs */}
      <Container styling="px-4 md:px-6 scrollbar-hide rounded-xl">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative py-6 px-6 ${
                activeTab === tab.id
                  ? "text-blue after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:h-[2px] after:w-16 after:bg-blue"
                  : "text-gray hover:text-blue"
              }`}
            >
              <Typography size="md" className="font-semibold whitespace-nowrap">
                {tab.title}
              </Typography>
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Tabs;
