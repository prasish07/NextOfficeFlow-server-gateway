import gateway from "fast-gateway";
import path from "path";
import dotenv from "dotenv";

const absolutePath = path.join(__dirname, "../.env");
dotenv.config({ path: absolutePath });

const gatewayPort = process.env.PORT || 5000;

const server = gateway({
	routes: [
		{
			prefix: "/api/v1/announcement",
			target: process.env.SERVER_ANNOUNCEMENT_URL ?? "http://localhost:5001",
		},
		{
			prefix: "/api/v1",
			target: process.env.SERVER_URL ?? "http://localhost:5002",
		},
	],
});

server.start(gatewayPort as number).then((server) => {
	console.log(`Gateway server is running on port ${gatewayPort}`);
});
