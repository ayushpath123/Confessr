import z from 'zod'

export const signupInput = z.object({
      name:z.string(),
      email:z.string().email(), 
      password:z.string().min(6)
})
export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    email:z.string().email(), 
    password:z.string().min(6)
})
export type SigninInput = z.infer<typeof signupInput>

export const createPost = z.object({
    title:z.string(),
    content:z.string()
})
export type CreatePost = z.infer<typeof createPost>

export const updatePost = z.object({
    id:z.string(),
    title:z.string(), 
    content:z.string()
})
export type UpdatePost = z.infer<typeof updatePost>