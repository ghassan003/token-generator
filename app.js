import express from "express";
const app = express();
import cors from "cors";
const port = 3000;
import { JWT } from "google-auth-library";
import { serviceAccount } from "./data.js";
app.use(
	cors({
		origin: "*"
	})
);
const SCOPES = ["https://www.googleapis.com/auth/firebase.messaging"];
app.get("/", async (req, res) => {
	const client = new JWT({
		email: serviceAccount.client_email,
		key: serviceAccount.private_key,
		scopes: SCOPES
	});

	async function getAccessToken() {
		const tokens = await client.authorize();
		const accessToken = tokens.access_token;
		return accessToken;
	}

	res.json(await getAccessToken());
});

app.listen(port, () => {
	console.log(`Express is listening at http://localhost:${port}`);
});
