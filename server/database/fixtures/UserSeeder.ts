import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "user", truncate: true });
  }

  run() {
    const totalUser = 50;
    for (let i = 0; i < totalUser; i++) {
      const isAdmin = i % totalUser === 0;

      const fakeUser = {
        firstname: this.faker.person.firstName(),
        lastname: this.faker.person.lastName(),
        email: this.faker.internet.email(),
        phone: this.faker.string.octal({ length: 8, prefix: "+33 6" }),
        password: this.faker.internet.password(),
        role: isAdmin ? "admin" : "client",
        refName: `user_${i}`,
      };

      this.insert(fakeUser);
    }
  }
}

export default UserSeeder;
