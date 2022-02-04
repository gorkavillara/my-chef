import React, { useContext } from "react";
import { AdminContext } from "..";
import UsersTable from "../components/UsersTable";

const Users = () => {
  const { store } = useContext(AdminContext);
  return <>{store ? <UsersTable users={store.settings.users} /> : null}</>;
};

export default Users;
