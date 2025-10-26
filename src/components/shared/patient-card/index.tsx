import React from "react";

import Container from "../container";
import { Typography } from "../typography";

interface Card {
  id: number;
  title: string;
  details: { label: string; value: string }[];
}

const PatientCard: React.FC<{ card: Card }> = ({ card }) => {
  return (
    <Container key={card.id} isSideBorder styling="w-full">
      <div className="py-8 px-7">
        <Typography size="h4" className="text-blue mb-5">
          {card.title}
        </Typography>
        <div className="">
          {card.details.map((detail, index) => (
            <div key={index}>
              <Typography size="md" className=" text-gray mb-1 font-normal">
                {detail.label}
              </Typography>
              <Typography size="md" className=" text-blue mb-1 font-semibold">
                {detail.value}
              </Typography>
              {index === 0 && (
                <div className="w-full h-[1px] bg-light-gray my-5"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PatientCard;
