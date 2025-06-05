import AbstractSeeder from "./AbstractSeeder";
import UserSeeder from "./UserSeeder";

class AddressSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "address", truncate: true, dependencies: [UserSeeder] });
  }

  run() {
    const totalUser = 50;
    for (let i = 0; i < totalUser; i++) {
      const fakeAddress = {
        street: this.faker.location.street(),
        city: this.faker.location.city(),
        zip_code: this.faker.location.zipCode(),
        country: this.faker.location.country(),
        user_id: this.getRef(`user_${i}`).insertId,
        refName: `address_${i}`,
      };
      this.insert(fakeAddress);
    }
  }
}

export default AddressSeeder;
