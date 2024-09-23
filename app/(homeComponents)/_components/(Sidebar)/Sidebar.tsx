import fetch from "@/actions/fetch-recommended";
import { Toggle } from "./Toggle";
import Wrapper from "./Wrapper";
import RecommendedUsers from "./RecommendedUsers";
import { getFollowedUsers } from "@/actions/follow-service";
import FollowedUsers from "./FollowedUsers";

export default async function Sidebar() {
  const recommendedUsers = await fetch();
  const follows = await getFollowedUsers();
  return (
    <Wrapper>
      <Toggle />
      <FollowedUsers data={follows} />
      <RecommendedUsers users={recommendedUsers} />
    </Wrapper>
  );
}
