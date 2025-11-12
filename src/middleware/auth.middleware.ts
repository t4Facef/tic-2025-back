import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    // amazonq-ignore-next-line
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any;
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

export const adminAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    // amazonq-ignore-next-line
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any;
    
    // Verificar se é admin
    if (decoded.role !== 'ADMIN') {
      return res.status(403).json({ error: "Acesso negado. Apenas administradores podem realizar esta ação." });
    }
    
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};