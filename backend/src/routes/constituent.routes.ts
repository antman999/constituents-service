import { Router, Request, Response } from "express";
import { Parser } from "json2csv";
import {
  getAllConstituents,
  addConstituent,
  getAllConstituentsPaginated,
} from "../services/constituent.service";
import { format } from "date-fns";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string | undefined;
    const sortOrder =
      req.query.sortOrder === "asc" || req.query.sortOrder === "desc"
        ? req.query.sortOrder
        : undefined;

    const result = getAllConstituentsPaginated(page, limit, search, sortOrder);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "Error getting users" });
  }
});

router.post("/", (req: Request, res: Response) => {
  try {
    const { email, name, address } = req.body;
    if (!email || !name || !address) {
      res
        .status(400)
        .json({ message: "Email, name, and address are required fields." });
      return;
    }
    const { constituent, wasCreated } = addConstituent({
      email,
      name,
      address,
    });
    const statusCode = wasCreated ? 201 : 200;
    res.status(statusCode).json(constituent);
  } catch (error) {
    console.error("Error submitting constituent:", error);
    res.status(500).json({ message: "Error submitting constituent" });
  }
});

router.get("/export", (req: Request, res: Response) => {
  try {
    const { startTime, endTime } = req.query;
    let constituentsToExport = getAllConstituents();

    if (startTime && typeof startTime === "string") {
      const start = new Date(startTime);
      constituentsToExport = constituentsToExport.filter(
        (c) => new Date(c.signUpTime) >= start
      );
    }

    if (endTime && typeof endTime === "string") {
      const end = new Date(endTime);
      end.setUTCDate(end.getUTCDate() + 1);

      constituentsToExport = constituentsToExport.filter(
        (c) => new Date(c.signUpTime) < end
      );
    }

    if (constituentsToExport.length === 0) {
      res
        .status(404)
        .json({ message: "No constituents found for the given time range." });
      return;
    }

    const formattedConstituents = constituentsToExport.map((c) => {
      return {
        name: c.name,
        email: c.email,
        address: c.address,
        signUpTime: format(new Date(c.signUpTime), "MMMM d, yyyy, h:mm a"),
      };
    });

    const fields = ["name", "email", "address", "signUpTime"];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(formattedConstituents);

    res.header("Content-Type", "text/csv");
    res.attachment("constituents.csv");
    res.status(200).send(csv);
  } catch (error) {
    console.error("Error exporting CSV:", error);
    res.status(500).json({ message: "Error exporting CSV" });
  }
});

export default router;
