import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import { Faker, es, en } from "@faker-js/faker";


export const createHash = async (password) =>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
};

export const isValidPassword = (user, password) => bcrypt.compare(password,user.password);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;


export const customFaker = new Faker({ locale: [en] });

const { commerce, image, database, string, internet, person, phone,datatype, lorem } = customFaker;


export const generateProduct = () =>{
    return {
        id: database.mongodbObjectId(),
        title: commerce.productName(),
        description: commerce.productDescription(),
        price: parseFloat(commerce.price()),
        thumbnail: image.url(),
        code: string.alphanumeric(10),
        stock: parseInt(string.numeric(2)),
        departament: commerce.department(),
    }
}

export const generateUser = () => {
    const productsNumber = Math.ceil(Math.random()*10);
    let products = [];
    for (let i = 0; i < productsNumber; i++) {
         const product = generateProduct();
         products.push(product);
    }
    return {
        id: database.mongodbObjectId(),
        first_name: person.firstName(),
        last_name: person.lastName(),
        phone: phone.number(),
        email: internet.email(),
        avatar: image.avatar(),
        role: datatype.boolean() ? "premium" : "user",
        jobTitle: person.jobTitle(),
        cart: products
    }
}