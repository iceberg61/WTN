import jwt from "jsonwebtoken";

export const verifyToken = async (req: Request) => {
  try {
    const header = req.headers.get("authorization");

    if (!header) return null;

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    return decoded as any;
  } catch {
    return null;
  }
};
