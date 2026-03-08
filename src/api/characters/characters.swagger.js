/**
 * @openapi
 * tags:
 *   - name: Characters
 *     description: Famous cartoon characters from various universes
 */

/**
 * @openapi
 * /api/characters:
 *   get:
 *     summary: Get all characters
 *     tags:
 *       - Characters
 *     responses:
 *       200:
 *         description: List of characters
 */

/**
 * @openapi
 * /api/characters/{id}:
 *   get:
 *     summary: Get a character by ID
 *     tags:
 *       - Characters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A character
 *       400:
 *         description: Invalid character id
 *       404:
 *         description: Character not found
 */


/**
 * @openapi
 * /api/characters/{id}/slow:
 *   get:
 *     summary: Get a character by ID slowly
 *     tags:
 *       - Characters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A character
 *       404:
 *         description: Character not found
 */


/**
 * @openapi
 * /api/characters/new:
 *   post:
 *     summary: Create a new character
 *     tags:
 *       - Characters
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               profession: { type: string }
 *               race: { type: string }
 *     responses:
 *       201:
 *         description: Character created
 */

/**
 * @openapi
 * /api/characters/update/{id}:
 *   put:
 *     summary: Update a character by ID and payload
 *     tags:
 *       - Characters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
  *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               profession: { type: string }
 *               race: { type: string }
 *     responses:
 *       200:
 *         description: Updated character
 *       400:
 *         description: Invalid character id
 *       404:
 *         description: Character not found
 */

/**
 * @openapi
 * /api/characters/delete/{id}:
 *   delete:
 *     summary: Delete a character by ID
 *     tags:
 *       - Characters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Updated character
 *       400:
 *         description: Invalid character id
 *       404:
 *         description: Character not found
 */

/**
 * @openapi
 * /api/characters/test/not-allowed:
 *   get:
 *     summary: Get HTML content
 *     tags:
 *       - Characters
 *     responses:
 *       405:
 *         description: Method not allowed
 */

/**
 * @openapi
 * /api/characters/update/{id}/broken:
 *   put:
 *     summary: Update a character by ID and payload
 *     tags:
 *       - Characters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
  *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               profession: { type: string }
 *               race: { type: string }
 *     responses:
 *       200:
 *         description: Updated character
 *       400:
 *         description: Invalid character id
 *       404:
 *         description: Character not found
 *       405:
 *         description: Fails randomly
 */