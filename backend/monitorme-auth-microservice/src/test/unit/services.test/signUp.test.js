import authService from "../../../services/authService.js"

test("test_sign_up_with_valid_input", async () => {
    const mockUser = {
        username: "testuser",
        email: "testuser@test.com",
        password: "testpassword",
        roles: ["regular"]
    };
    const token = await authService.signUp(mockUser);
    expect(typeof token).toBe("string");
});

test("test_sign_up_with_no_roles_specified", async () => {
    const mockUser = {
        username: "testuser",
        email: "testuser@test.com",
        password: "testpassword"
    };
    const token = await authService.signUp(mockUser);
    expect(typeof token).toBe("string");
});

test("test_sign_up_with_invalid_input", async () => {
    const mockUser = {
        username: "",
        email: "testuser@test.com",
        password: "testpassword"
    };
    await expect(authService.signUp(mockUser)).rejects.toThrow();
});

test("test_sign_up_with_nonexistent_roles", async () => {
    const mockUser = {
        username: "testuser",
        email: "testuser@test.com",
        password: "testpassword",
        roles: ["nonexistent"]
    };
    await expect(authService.signUp(mockUser)).rejects.toThrow();
});


test("test_sign_up_with_invalid_roles", async () => {
    const mockUser = {
        username: "testuser",
        email: "testuser@test.com",
        password: "testpassword",
        roles: ["invalid!role"]
    };
    await expect(authService.signUp(mockUser)).rejects.toThrow();
});


test("test_sign_up_with_circular_dependencies", async () => {
    const mockRole1 = new Role({
        name: "role1",
        parent: null
    });
    const mockRole2 = new Role({
        name: "role2",
        parent: mockRole1._id
    });
    mockRole1.parent = mockRole2._id;
    await mockRole1.save();
    await mockRole2.save();

    const mockUser = {
        username: "testuser",
        email: "testuser@test.com",
        password: "testpassword",
        roles: ["role1"]
    };
    await expect(authService.signUp(mockUser)).rejects.toThrow();
});