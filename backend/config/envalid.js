const { cleanEnv, str, port } = require('envalid');

const envalidOptions = {
	  NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
	  API: str(),
	  PORT: port(),
	  MONGO_URI: str(),
	  JWT_ACCESS_TOKEN_SECRET: str(),
	  JWT_ACCESS_TOKEN_EXPIRES_IN: str(),
	  JWT_REFRESH_TOKEN_SECRET: str(),
	  JWT_REFRESH_TOKEN_EXPIRES_IN: str(),
	  CLOUDINARY_CLOUD_NAME: str(),
	  CLOUDINARY_API_KEY: str(),
	  CLOUDINARY_API_SECRET: str(),
};

const env = cleanEnv(process.env, envalidOptions);

module.exports = env;
