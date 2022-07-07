// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    res.status(404).json({ error: "Please use with a slug" });
    return;
  }

  const data = await prisma?.shortLink.findFirst({
    where: { slug },
  });

  if (!data) {
    res.status(404).json({ error: "Slug not found" });
    return;
  }

  return res.redirect(data.url);
};

export default examples;
