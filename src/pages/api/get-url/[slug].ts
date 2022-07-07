import { prisma } from '../../../server/db/client';

import type { NextApiRequest, NextApiResponse } from "next";
const slug = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    res.status(404).json({ error: "Please use with a slug" });
    return;
  }

  const data = await prisma?.shortLink.findFirst({
    where: { slug },
  });

  if (!data) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=10000, max-age=0");
    res.status(404).json({ error: "Slug not found" });
    return;
  }

  return res.json(data);
};

export default slug;
