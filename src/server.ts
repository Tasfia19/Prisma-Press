import {Request, Response } from "express";
import app from "./app";
import { prisma } from "./lib/prisma";
import config from "./config";


const PORT = config.port;
    

const main = async () => {

	try {
        await prisma.$connect();
        console.log("Connected to the Database successfully");
		app.listen(PORT, () => {
			console.log(`server is running on port ${PORT}`);
		});
	} catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
	}
};

main();
