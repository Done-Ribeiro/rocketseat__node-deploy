import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import { z } from 'zod' // biblioteca para fazer a validação do { name, email }

const app = fastify()

// cria conexão com BD
const prisma = new PrismaClient()

app.get('/users', async () => {
  const users = await prisma.user.findMany()

  return { users }
})

app.post('/users', async (request, reply) => {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
  })

  // faz a validação de { name, email }
  const { name, email } = createUserSchema.parse(request.body)

  // cadastra usuário no BD
  await prisma.user.create({
    data: {
      name,
      email
    }
  })

  // uma dica é pegar o obj reply do 'fastify' e retornar um 201 -> criação
  return reply.status(201).send()
})

/**
  Plataformas de hospedagem como Heroku, Render e Fly
  setam a porta da aplicação de uma forma manual
  através de uma variável de ambiente chamada 'PORT'
  por isso é legal no lugar de usar o port direto como:
  port: 3333
  usarmos algo assim:
  port: process.env.PORT || 3333
  ---
  observação:
  a port vem como string, então se essa variável estiver setada
  precisamos fazer um cast pra number de port assim:
  -
  port: process.env.PORT ? Number(process.env.PORT) : 3333
 * */ 
app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
  console.log('HTTP Server Running')
})