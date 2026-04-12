import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("verify.instagram", () => {
  it("returns a valid response for a known Instagram username", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.verify.instagram({ username: "instagram" });

    expect(result).toHaveProperty("platform", "instagram");
    expect(result).toHaveProperty("target", "instagram");
    expect(result).toHaveProperty("exists");
    // Valid format username should return exists=true (either via API or simulation)
    expect(result.exists).toBe(true);
  }, 15000);

  it("handles username with @ prefix correctly", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.verify.instagram({ username: "@cristiano" });

    expect(result.platform).toBe("instagram");
    expect(result.target).toBe("cristiano");
    expect(result.exists).toBe(true);
  }, 15000);

  it("returns exists=false for an invalid format username", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Username with spaces and special chars is invalid format
    const result = await caller.verify.instagram({
      username: "invalid user name!!!",
    });

    expect(result.platform).toBe("instagram");
    expect(result.exists).toBe(false);
  }, 15000);

  it("returns exists=false for empty username after normalization", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.verify.instagram({ username: "@" });

    expect(result.platform).toBe("instagram");
    expect(result.exists).toBe(false);
  }, 15000);
});

describe("verify.whatsapp", () => {
  it("returns a valid response for a Brazilian phone number format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.verify.whatsapp({ phone: "+5511999999999" });

    expect(result).toHaveProperty("platform", "whatsapp");
    expect(result).toHaveProperty("target", "+5511999999999");
    expect(result).toHaveProperty("exists");
  }, 15000);

  it("returns exists=false for an obviously invalid short number", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.verify.whatsapp({ phone: "123" });

    expect(result.platform).toBe("whatsapp");
    expect(result.exists).toBe(false);
  }, 15000);
});

describe("verify.messenger", () => {
  it("returns a valid response for a known Facebook page", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.verify.messenger({ identifier: "facebook" });

    expect(result).toHaveProperty("platform", "messenger");
    expect(result).toHaveProperty("target", "facebook");
    expect(result).toHaveProperty("exists");
  }, 15000);

  it("returns exists=false for very short identifier", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.verify.messenger({ identifier: "x" });

    expect(result.platform).toBe("messenger");
    expect(result.exists).toBe(false);
  }, 15000);
});
