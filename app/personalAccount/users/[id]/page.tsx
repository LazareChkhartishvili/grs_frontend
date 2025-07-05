import React from "react";
import PersonalAccount from "../../page";

type Props = {
  params: {
    id: string;
  };
};

const UserPage = ({ params }: Props) => {
  const userId = params.id;
  console.log(userId);

  return <PersonalAccount />;
};

export default UserPage;
