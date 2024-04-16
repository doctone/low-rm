import { initializeDatabase } from "./connection";
import { when } from "jest-when";
jest.mock("pg", () => {
  const mClient = {
    connect: jest.fn(),
    end: jest.fn(),
    query: jest.fn(),
  };
  return {
    Client: jest.fn(() => mClient),
  };
});

describe("Low-RM", () => {
  describe("connection", () => {
    it("should successfully establish a database connection", async () => {
      // Act
      const client = await initializeDatabase(
        "postgres://user:password@localhost:5432/dbname"
      );

      // Assert
      expect(client).toBeDefined();
      expect(client.connect).toHaveBeenCalledTimes(1);
    });
  });

  describe("select( {query, table} )", () => {
    it("should return the result of a SELECT query", async () => {
      const client = await initializeDatabase(
        "postgres://user:password@localhost:5432/dbname"
      );
      const query = "id, name";
      const table = "users";
      const expectedQuery = `SELECT ${query} FROM ${table}`;
      const expectedResult = { rows: [{ id: 1, name: "Alice" }] };
      when(client.query)
        .calledWith(expectedQuery as never)
        .mockResolvedValue(expectedResult as never);

      const result = await client.select({ query, table });

      expect(result).toEqual(expectedResult);
      expect(client.query).toHaveBeenCalledWith(expectedQuery);
    });
  });

  describe("insert({ table, values })", () => {
    it("should insert a new record into the specified table", async () => {
      const client = await initializeDatabase(
        "postgres://user:password@localhost:5432/dbname"
      );
      const table = "users";
      const values = ['1, "Alice"'];
      const expectedQuery = `INSERT INTO ${table} VALUES ${values.join(",")}`;
      const expectedResult = { rows: [{ id: 1, name: "Alice" }] };
      when(client.query)
        .calledWith(expectedQuery as never)
        .mockResolvedValue(expectedResult as never);

      const result = await client.insert({ table, values });

      expect(result).toEqual(expectedResult);
      expect(client.query).toHaveBeenCalledWith(expectedQuery);
    });
  });
});
