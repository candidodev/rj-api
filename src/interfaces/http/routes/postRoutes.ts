import { Router } from 'express';
import { makePostController } from '../factories/makePostController';
import upload from '../../../config/multer';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const postController = makePostController();
const postRoutes = Router();

/**
 * Rotas de posts.
 * 
 * Esse arquivo define as rotas de posts para o aplicativo.
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Operações relacionadas a posts
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post com imagens
 *     description: Cria um novo post com possíveis anexos de imagens (até 5 arquivos, 5MB cada)
 *     tags: [Posts]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token no formato "Bearer {token}"
 *         example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - categoria_idcategoria
 *               - content
 *             properties:
 *               categoria_idcategoria:
 *                 type: integer
 *                 format: int32
 *                 example: 1
 *               content:
 *                 type: string
 *                 example: "Preciso de ajuda com doações de roupas"
 *               metadata:
 *                 type: string
 *                 description: JSON string dos metadados, contendo campos obrigatórios definidos pela categoria
 *                 example: '{"title":"Doação de Roupas","itemType":"Roupas", "condition": "usado", "location": "Zona Leste", "availability": "manhã"}'
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostWithImages'
 *       400:
 *         description: Dados inválidos ou campos obrigatórios faltando
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PostWithImages:
 *       type: object
 *       properties:
 *         idpost:
 *           type: integer
 *           example: 1
 *         content:
 *           type: string
 *           example: "Preciso de ajuda com doações de roupas"
 *         user_iduser:
 *           type: integer
 *           example: 123
 *         categoria_idcategoria:
 *           type: integer
 *           example: 1
 *         time:
 *           type: string
 *           format: date-time
 *           example: "2023-05-15T10:00:00Z"
 *         metadata:
 *           type: object
 *           example:
 *             title: "Doação de Roupas"
 *             itemType: "Roupas"
 *         images:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               idimage:
 *                 type: integer
 *                 example: 1
 *               image:
 *                 type: string
 *                 example: "uploads/123456789-imagem.jpg"
 */
postRoutes.post(
  '/',
  ensureAuthenticated,
  upload.array('images', 5), // Aceita até 5 imagens
  postController.create
);

export default postRoutes;
