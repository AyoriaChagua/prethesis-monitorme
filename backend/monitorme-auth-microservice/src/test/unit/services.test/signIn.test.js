import authService from "../../../services/authService.js"

test("test_user_found_with_valid_credentials", async () => {
    const email = "test@test.com";
    const password = "testpassword";
    const user = new User({ email, password });
    await user.save();

    const token = await authService.signIn({ email, password });

    expect(token).toBeDefined();
});

test("test_user_not_found", async () => {
    const email = "test@test.com";
    const password = "testpassword";

    const token = await authService.signIn({ email, password });

    expect(token).toBeUndefined();
});


test("test_invalid_password", async () => {
    const email = "test@test.com";
    const password = "testpassword";
    const user = new User({ email, password });
    await user.save();

    const invalidPassword = "invalidpassword";
    const token = await authService.signIn({ email, invalidPassword });

    expect(token).toBeUndefined();
});

test("test_token_expiration_time", async () => {
    jest.useFakeTimers();
    const email = "test@test.com";
    const password = "testpassword";
    const user = new User({ email, password });
    await user.save();

    const token = await authService.signIn({ email, password });

    jest.advanceTimersByTime(86400 * 1000);
    expect(() => jwt.verify(token, JWT_SECRET)).toThrow();
});

test("test_jwt_secret_not_provided", async () => {
    const email = "test@test.com";
    const password = "testpassword";
    const user = new User({ email, password });
    await user.save();

    process.env.JWT_SECRET = undefined;
    const token = await authService.signIn({ email, password });

    expect(token).toBeUndefined();
});

test("test_user_has_no_roles", async () => {
    const email = "test@test.com";
    const password = "testpassword";
    const user = new User({ email, password });
    await user.save();

    const token = await authService.signIn({ email, password });

    expect(token).toBeUndefined();
});