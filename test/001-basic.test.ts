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

describe('Basic Operation', () => {
    it('should connect to mongodb', async () => {
        try {
            await mongoose
                .connect(URI)
                .then(() => console.log('success connecting'));
        } catch (error) {
            console.error('Error');
        } finally {
            await mongoose.connection.close();
        }
    });

    it('should insert data to mongodb', async () => {
        try {
            await mongoose.connect(URI);
            const person = new Person({
                name: 'Agus',
                age: '19'
            });
            await person.save().then((person: Persons) => console.info(person));
        } catch (error) {
            console.error('Error');
        } finally {
            await mongoose.connection.close();
        }
    });

    it('should insert many data to mongodb', async () => {
        try {
            await mongoose.connect(URI);
            const person: Array<{ name: string; age: string }> = [
                {
                    name: 'Arunika',
                    age: '17'
                },
                {
                    name: 'Lidiya',
                    age: '18'
                },
                {
                    name: 'Nova',
                    age: '20'
                }
            ];
            await Person.insertMany(person).then((person: Array<Persons>) =>
                console.info(person)
            );
        } catch (error) {
            console.error('Error');
        } finally {
            await mongoose.connection.close();
        }
    });
});
