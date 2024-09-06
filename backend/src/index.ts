import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge.js';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import { signupInput,signinInput, createPost ,updatePost} from '@ayuspthak/medium-zod/dist/zod'
import { cors} from 'hono/cors'
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userID: string;
  };
}>();
app.use("/*",cors());
// Middleware for JWT Authorization
app.use('/api/v1/blogs/*', async (c, next) => {
  const token = await c.req.header("authorization") || "";
  try {
    const user = await verify(token, c.env.JWT_SECRET);
    //@ts-ignore
    c.set("userID", user.id);
    await next();
  } catch (error) {
    return c.json({ msg: "Invalid or expired token" }, 401);
  }
});

// Signup Route
app.post('/api/v1/signup', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const { success } = signupInput.safeParse(body);
  if(!success){
    return c.json({
      msg:"Wrong Input Format"
    })
  }
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ msg: token });
  } catch (error) {
    console.error("Error signing up:", error);
    return c.json({ msg: "Signup failed", error: "error" }, 500);
  }
});

// Signin Route
app.post('/api/v1/signin', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const { success } = signinInput.safeParse(body);
  if(!success){
    return c.json({
      msg:"Wrong Input Format"
    })
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email: body.email,password:body.password },
    });
    if (user) {
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ msg: "Signin successful", token });
    } else {
      return c.json({ msg: "User does not exist" }, 404);
    }
  } catch (error) {
    console.error("Error signing in:", error);
    return c.json({ msg: "Signin failed", error: "error" }, 500);
  }
});

// Create New Blog Post Route
app.post('/api/v1/blogs/newblog', async (c) => {
  const body =  await c.req.json();
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const userId =  c.get("userID");
  const {success} = createPost.safeParse(body);
  if(!success){
    return c.json({
      msg:"Provide Valid Inputs"
    })
  }

  try {
    const blogId=await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
      select:{
        id:true
      }
    });
    return c.json(blogId, 201);
  } catch (error) {
    console.error("Error creating blog:", error);
    return c.json({ msg: "Blog not created", error: "error" }, 500);
  }
});

// Update Blog Post Route
app.put('/api/v1/blogs', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const userId = c.get("userID");
  const {success}=updatePost.safeParse(body);
  if(!success){
    return c.json({
      msg:"Provide Valid Inputs"
      })
  }
  try {
    await prisma.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return c.json({ msg: "Blog updated" }, 200);
  } catch (error) {
    console.error("Error updating blog:", error);
    return c.json({ msg: "Blog not updated", error: "error" }, 500);
  }
});

// Get Blog Post by ID Route
app.get('/api/v1/blogs/:id', async (c) => {
  const blogId = c.req.param("id");
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findUnique({
      where: { id: blogId },
      select:{
        id:true,
        title:true,
        content:true
      }
    });
    return c.json({ blog});
  } catch (error) {
    console.error("Error fetching blog:", error);
    return c.json({ msg: "Error fetching blog", error: "error" }, 500);
  }
});

// Get All Blog Posts Route
app.get('/api/v1/blogs', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  try {
    const blogs = await prisma.post.findMany();
    return c.json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return c.json({ msg: "Error fetching blogs", error: "error" }, 500);
  }
});

export default app;
