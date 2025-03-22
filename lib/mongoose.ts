import mongoose from 'mongoose';

// Define the global interface to handle the cached mongoose connection
declare global {
	// eslint-disable-next-line no-var
	var mongoose: {
		conn: mongoose.Connection | null;
		promise: Promise<mongoose.Connection> | null;
	};
}

// Mongoose connection is attached to the `global` object in development to prevent
// exhausting your database connection limit.

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env.local'
	);
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};

		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose.connection;
		});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

export default dbConnect;
