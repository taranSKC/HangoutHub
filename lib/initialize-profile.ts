import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import db from "./db";

export const initializeProfile = async () => {
  try {
    const user = await currentUser(); 
    if (!user) return redirectToSignIn();
    const _profile = await db.profile.findUnique({
      where: { userId: user.id },
    });
    console.log(_profile, "profile");
    if (!_profile) {
      const newProfile = await db.profile.create({
        data: {
          userId: user.id,
          name: `${user?.firstName}` + " " + `${user?.lastName}`,
          imageUrl: user?.imageUrl,
          email: user?.emailAddresses[0].emailAddress,
        },
      });
      console.log("New Profile Created");
      return newProfile;
    } else {
      console.log("Welcome Buddy");
      return _profile;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};
