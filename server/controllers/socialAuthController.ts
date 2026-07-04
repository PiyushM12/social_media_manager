import { Response } from "express";
import zernio from "../config/zernio.js";
import { User } from "../models/user.js";
import { Account } from "../models/Account.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";

// Get or create Zernio profile
const getOrCreateZernioProfile = async (user: any): Promise<string> => {
  try {
    // Use cached profile ID if available
    if (user.zernioProfileId) {
      return user.zernioProfileId;
    }

    const result = await zernio.profiles.listProfiles();
    console.log("Profiles Response:", JSON.stringify(result.data, null, 2));

    const data = result.data as any;

    const profiles =
      data?.profiles || data?.data || (Array.isArray(data) ? data : []);

    if (profiles.length > 0) {
      const pid = profiles[0]._id || profiles[0].id;

      await User.findByIdAndUpdate(user._id, {
        zernioProfileId: pid,
      });

      return pid;
    }

    // Create profile if none exists
    const createResult = await zernio.profiles.createProfile({
      body: {
        name: `${user.name || user.email}'s workspace`,
      } as any,
    });

    console.log(
      "Create Profile Response:",
      JSON.stringify(createResult.data, null, 2),
    );

    const created = (createResult.data as any)?.profile || createResult.data;

    const pid = created?._id || created?.id;

    if (!pid) {
      throw new Error("No profile ID returned from Zernio");
    }

    await User.findByIdAndUpdate(user._id, {
      zernioProfileId: pid,
    });

    return pid;
  } catch (err: any) {
    console.error("getOrCreateZernioProfile:", err);
    throw err;
  }
};

// Generate OAuth URL
export const generateAuthUrl = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { platform } = req.params;

    const profileId = await getOrCreateZernioProfile(req.user);

    const origin = req.headers.origin;

    const redirectUrl = `${origin}/accounts`;

    const result = await zernio.connect.getConnectUrl({
      path: {
        platform: platform as any,
      },
      query: {
        profileId,
        redirect_url: redirectUrl,
      },
    });

    console.log("Connect URL:", JSON.stringify(result.data, null, 2));

    const authUrl = (result.data as any).authUrl;

    if (!authUrl) {
      throw new Error("No authUrl returned");
    }

    res.json({
      url: authUrl,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// Sync accounts
export const syncAccounts = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const profileId = await getOrCreateZernioProfile(req.user);

    console.log("Profile ID:", profileId);

    const result = await zernio.accounts.listAccounts({
      query: {
        profileId,
      } as any,
    });

    console.log("Accounts Response:", JSON.stringify(result.data, null, 2));

    const data = result.data as any;

    const zernioAccounts =
      data?.accounts || data?.data || (Array.isArray(data) ? data : []);

    console.log("Parsed Accounts:", zernioAccounts);

    const supportedPlatforms = ["twitter", "linkedin", "facebook", "instagram"];

    const syncedAccounts = [];

    for (const zAccount of zernioAccounts) {
      console.log("Processing:", zAccount);

      const zid = zAccount._id || zAccount.id;

      if (!zid) {
        console.warn("Missing account ID");
        continue;
      }

      const rawPlatform = (
        zAccount.platform ||
        zAccount.type ||
        ""
      ).toLowerCase();

      const normalizedPlatform = supportedPlatforms.find((p) =>
        rawPlatform.includes(p),
      );

      if (!normalizedPlatform) {
        console.log("Unsupported:", rawPlatform);
        continue;
      }

      const account = await Account.findOneAndUpdate(
        {
          zernioAccountId: zid,
        },
        {
          user: req.user._id,
          platform: normalizedPlatform,
          handle:
            zAccount.username || zAccount.handle || zAccount.name || "Unknown",

          status: "connected",

          avatarUrl:
            zAccount.avatarUrl ||
            zAccount.picture ||
            zAccount.profile_image_url,

          zernioAccountId: zid,
        },
        {
          upsert: true,
          new: true,
        },
      );

      console.log("Saved:", account);

      syncedAccounts.push(account);
    }

    res.json(syncedAccounts);
  } catch (err: any) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
