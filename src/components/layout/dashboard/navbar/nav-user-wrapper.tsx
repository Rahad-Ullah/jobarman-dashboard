import { NavUser } from "./nav-user";
import { nextFetch } from "@/utils/nextFetch";

const NavUserWrapper = async () => {
  // fetch user profile data from server
  const res = await nextFetch("/user/profile", {
    tags: ["profile"],
  });

  return <NavUser user={res?.data} />;
};

export default NavUserWrapper;
