import mongoose, { Schema, Document, Model } from 'mongoose';
import 'dotenv/config';

const URI: string = process.env.MONGO_URI || '';

interface Persons extends Document {
    name: string;
    age: string;
}
const PersonSchema: Schema<Persons> = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    }
});
const Person = mongoose.model('Person', PersonSchema);

describe('Get Data', () => {
    it('should get all data', async () => {
        try {
            await mongoose.connect(URI);
            const persons: Array<Persons> = await Person.find();
            console.info(persons);
        } catch (error) {
            console.error(error);
        } finally {
            await mongoose.connection.close();
        }
    });

    it('should find one data', async () => {
        try {
            await mongoose.connect(URI);
            const persons: Persons | null = await Person.findOne({
                name: 'Supri'
            });
            console.info(persons);
        } catch (error) {
            console.error(error);
        } finally {
            await mongoose.connection.close();
        }
    });

    it('should find by id', async () => {
        try {
            await mongoose.connect(URI);
            const persons: Persons | null = await Person.findById(
                '66b080cc81a22ef427f47cc1'
            );
            console.info(persons);
        } catch (error) {
            console.error(error);
        } finally {
            await mongoose.connection.close();
        }
    });
});
