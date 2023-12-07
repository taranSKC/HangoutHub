import InitialModal from "@/components/modals/initial-modal";
import db from "@/lib/db";
import { initializeProfile } from "@/lib/initialize-profile";
import { redirect } from "next/navigation";

async function SetupPage() {
  const profile = await initializeProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  console.log(server, "server exists or not");
  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal/>;
}

export default SetupPage;
