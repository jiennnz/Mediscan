import { ChevronDown } from "lucide-react";
import Image from "next/image";
import ProfileButtons from "./ProfileButtons";
import { getSession } from "@/lib/server/auth";
import HistoryButton from "./HistoryButton";

const Profile = async () => {
  const session = await getSession();
  const avatar = session?.sessionData?.avatarLink;
  console.log(session?.sessionData?.avatarLink);
  return (
    <section className="flex items-center gap-[16px]">
      <HistoryButton />
      <div className="group relative flex cursor-pointer items-center gap-[4px]">
        <Image
          src={avatar || "/avatar.jpg"}
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-[25px] border-[1px] border-black50"
        />
        <ChevronDown className="stroke-black50" size={24} />

        <ProfileButtons />
      </div>
    </section>
  );
};

export default Profile;
