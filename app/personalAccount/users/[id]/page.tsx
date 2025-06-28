import React from "react";
import PersonalAccount from "../../page";

type Props = {
  params: {
    id: string;
  };
};

const UserPage = ({ params }: Props) => {
  const userId = params.id;

  return <PersonalAccount userId={userId} />;
};

export default UserPage;
