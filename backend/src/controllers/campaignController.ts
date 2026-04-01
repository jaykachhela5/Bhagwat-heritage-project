import type { Request, Response } from "express";
import Campaign from "../models/Campaign";
import { asyncHandler } from "../utils/asyncHandler";
import { buildCsv } from "../utils/csv";
import { campaignCreateSchema, campaignUpdateSchema } from "../schemas/campaign.schemas";

function toDateOrUndefined(value?: string) {
  return value ? new Date(value) : undefined;
}

export const getPublicCampaigns = asyncHandler(async (_req: Request, res: Response) => {
  const campaigns = await Campaign.find({ isActive: true }).sort({ createdAt: -1 });
  res.json(campaigns);
});

export const getAdminCampaigns = asyncHandler(async (_req: Request, res: Response) => {
  const campaigns = await Campaign.find().sort({ createdAt: -1 });
  res.json(campaigns);
});

export const createCampaign = asyncHandler(async (req: Request, res: Response) => {
  const payload = campaignCreateSchema.parse(req.body);

  const campaign = await Campaign.create({
    ...payload,
    startDate: toDateOrUndefined(payload.startDate),
    endDate: toDateOrUndefined(payload.endDate),
  });

  res.status(201).json({ message: "Campaign created", campaign });
});

export const updateCampaign = asyncHandler(async (req: Request, res: Response) => {
  const payload = campaignUpdateSchema.parse(req.body);
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    res.status(404).json({ message: "Campaign not found" });
    return;
  }

  if (payload.title !== undefined) campaign.title = payload.title;
  if (payload.description !== undefined) campaign.description = payload.description;
  if (payload.category !== undefined) campaign.category = payload.category;
  if (payload.goalAmount !== undefined) campaign.goalAmount = payload.goalAmount;
  if (payload.collectedAmount !== undefined) campaign.collectedAmount = payload.collectedAmount;
  if (payload.impactLine !== undefined) campaign.impactLine = payload.impactLine;
  if (payload.coverImage !== undefined) campaign.coverImage = payload.coverImage;
  if (payload.location !== undefined) campaign.location = payload.location;
  if (payload.donorCount !== undefined) campaign.donorCount = payload.donorCount;
  if (payload.isActive !== undefined) campaign.isActive = payload.isActive;
  if (payload.startDate !== undefined) campaign.startDate = toDateOrUndefined(payload.startDate);
  if (payload.endDate !== undefined) campaign.endDate = toDateOrUndefined(payload.endDate);

  await campaign.save();

  res.json({ message: "Campaign updated", campaign });
});

export const deleteCampaign = asyncHandler(async (req: Request, res: Response) => {
  const campaign = await Campaign.findByIdAndDelete(req.params.id);

  if (!campaign) {
    res.status(404).json({ message: "Campaign not found" });
    return;
  }

  res.json({ message: "Campaign deleted" });
});

export const getCampaignAnalytics = asyncHandler(async (_req: Request, res: Response) => {
  const [summary] = await Campaign.aggregate([
    {
      $group: {
        _id: null,
        totalCampaigns: { $sum: 1 },
        activeCampaigns: {
          $sum: { $cond: [{ $eq: ["$isActive", true] }, 1, 0] },
        },
        goalAmount: { $sum: "$goalAmount" },
        collectedAmount: { $sum: "$collectedAmount" },
        donors: { $sum: "$donorCount" },
      },
    },
  ]);

  res.json({
    totalCampaigns: summary?.totalCampaigns ?? 0,
    activeCampaigns: summary?.activeCampaigns ?? 0,
    goalAmount: summary?.goalAmount ?? 0,
    collectedAmount: summary?.collectedAmount ?? 0,
    donors: summary?.donors ?? 0,
  });
});

export const exportCampaignsCsv = asyncHandler(async (_req: Request, res: Response) => {
  const campaigns = await Campaign.find().sort({ createdAt: -1 });

  const csv = buildCsv(
    [
      "Title",
      "Category",
      "Goal Amount",
      "Collected Amount",
      "Impact Line",
      "Location",
      "Donor Count",
      "Active",
      "Created At",
    ],
    campaigns.map((campaign) => [
      campaign.title,
      campaign.category,
      campaign.goalAmount,
      campaign.collectedAmount,
      campaign.impactLine,
      campaign.location ?? "",
      campaign.donorCount,
      campaign.isActive ? "Yes" : "No",
      campaign.createdAt,
    ]),
  );

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", "attachment; filename=campaigns.csv");
  res.send(csv);
});
