import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from 'prisma-accelerate';

const app = new Hono();

// Prisma client with accelerate
const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL }).$extends(withAccelerate());

// Signup Route
app.post('/api/v1/signup', async (c) => {
  const body = await c.req.json();
  const { name, email, password } = body;

  // Input validation
  if (!name || !email || !password) {
    return c.json({ msg: "Wrong Input Format" });
  }

  try {
    const user = await prisma.user.create({
      data: { name, email, password },
    });
    const token = await sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
    return c.json({ msg: token });
  } catch (error) {
    console.error("Error signing up:", error);
    return c.json({ msg: "Signup failed", error: "error" }, 500);
  }
});

// Signin Route
app.post('/api/v1/signin', async (c) => {
  const body = await c.req.json();
  const { email, password } = body;

  // Input validation
  if (!email || !password) {
    return c.json({ msg: "Wrong Input Format" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email, password },
    });
    if (user) {
      const token = await sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
      return c.json({ msg: "Signin successful", token });
    } else {
      return c.json({ msg: "User does not exist" }, 404);
    }
  } catch (error) {
    console.error("Error signing in:", error);
    return c.json({ msg: "Signin failed", error: "error" }, 500);
  }
});

// Middleware to check token validity
app.use('/api/v1/blogs/*', async (c, next) => {
  const token = await c.req.header("authorization") || "";
  try {
    const user = await verify(token, process.env.JWT_SECRET);
    //@ts-ignore
    c.set("userID", user.id);
    await next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return c.json({ msg: "Token has expired" }, 401);
    }
    return c.json({ msg: "Invalid token" }, 401);
  }
});

// Your protected routes here
app.get('/api/v1/blogs', (c) => {
  // Protected route logic
  return c.json({ msg: "Welcome to the protected route!" });
});

export default app;
