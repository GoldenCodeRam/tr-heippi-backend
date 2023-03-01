import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const ROLES: { [key: number]: string } = {
        1: "Medic",
        2: "Patient",
        3: "Hospital",
    };
    const DOCUMENT_TYPES: { [key: number]: string } = {
        1: "CC",
        2: "DI",
    };

    // Same password for all users
    const DEFAULT_USER_PASSWORD = "123456";

    const HOSPITAL_AMOUNT = 5;

    // Seed some roles to the database
    for (const key of Object.keys(ROLES)) {
        await prisma.role.create({
            data: { Id: parseInt(key), Name: ROLES[parseInt(key)] },
        });
    }

    // Seed some document types to the database
    for (const key of Object.keys(DOCUMENT_TYPES)) {
        await prisma.documentType.create({
            data: { Id: parseInt(key), Name: DOCUMENT_TYPES[parseInt(key)] },
        });
    }

    // Create the hospital users
    for (let i = 0; i < HOSPITAL_AMOUNT; i++) {
        // Generate a user for every hospital
        const user = await prisma.user.create({
            data: {
                Email: faker.internet.email(),
                Phone: faker.phone.number(),
                Password: await hash(DEFAULT_USER_PASSWORD, 10),
                Document: faker.random.numeric(9),
                DocumentTypeId: 1,
                RoleId: 1,
                // User active by default
                UserStatusId: 2,
            },
        });

        // Then, create the hospital
        await prisma.hospital.create({
            data: {
                Name: faker.company.name(),
                Address: faker.address.streetAddress(),
                UserId: user.Id,
            },
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
