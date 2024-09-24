import mongoose from 'mongoose';

const connectToDB = async () => {
	const query = process.env.MONGO_QUERY;

	try {
		if (!query) {
			throw new Error(`Error: Problemas con la query de la DB`);
		}

		await mongoose.connect(query);

		console.log('Conexion exitosa a la DB!!');
	} catch (error) {
		console.log('Error al conectarse a la DB :-(');
		console.log(error);
	}
};

export default connectToDB;
