import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { chessPositionValidationSchema } from 'validationSchema/chess-positions';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.chess_position
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getChessPositionById();
    case 'PUT':
      return updateChessPositionById();
    case 'DELETE':
      return deleteChessPositionById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getChessPositionById() {
    const data = await prisma.chess_position.findFirst(convertQueryToPrismaUtil(req.query, 'chess_position'));
    return res.status(200).json(data);
  }

  async function updateChessPositionById() {
    await chessPositionValidationSchema.validate(req.body);
    const data = await prisma.chess_position.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteChessPositionById() {
    const data = await prisma.chess_position.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
