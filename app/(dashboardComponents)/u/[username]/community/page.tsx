import { getBlockedUsers } from "@/actions/blocked-service";
import { format } from "date-fns";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function CommunityPage() {
  const blockedUser = await getBlockedUsers();
  const formattedData = blockedUser.map((block) => ({
    ...block,
    userId: block.blocked.id,
    imageUrl: block.blocked.imageUrl || "",
    username: block.blocked.username,
    createdAt: format(new Date(block.blocked.createdAt), "dd/MM/yyyy"),
  }));
  return (
    <div className="p-6 ">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community Settings</h1>
      </div>
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
}
