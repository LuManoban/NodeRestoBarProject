import "dotenv/config";
import { ExpressConfig } from "./config/expressConfig";

const express = new ExpressConfig();

express.listen();
