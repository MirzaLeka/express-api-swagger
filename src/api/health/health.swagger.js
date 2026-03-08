/**
 * @openapi
 * tags:
 *   - name: Health
 *     description: Health Check
 */

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Get health status
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Service healthy
 *                 charactersCount:
 *                   type: integer
 *                   example: 12
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2026-03-08T14:45:15.437Z
  *                 uptimeSeconds:
 *                   type: number
 *                   format: number
 *                   example: 1.25
 *       500:
 *         description: Health check failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 message:
 *                   type: string
 *                   example: Health check failed
 *                 error:
 *                   type: string
 *                   example: ENOENT no such file or directory, open 'src/db/data.json'
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2026-03-08T14:45:15.437Z*
 *                 uptimeSeconds:
 *                   type: number
 *                   format: number
 *                   example: 1.25
 */
