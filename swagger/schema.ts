/**
 * @swagger
 * components:
 *   schemas:
 *     ItemCreateRequest:
 *       type: object
 *       required:
 *         - content
 *         - count
 *         - state
 *       properties:
 *         content:
 *           type: string
 *           description: The name of item
 *         count:
 *           type: number
 *           description: Number of items
 *         state:
 *           type: string
 *           description: State of item
 *       example:
 *         content: "Bread"
 *         count: 25
 *         state: "COMPLETED"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemUpdateRequest:
 *       type: object
 *       required:
 *       properties:
 *         content:
 *           type: string
 *           description: The name of item
 *         count:
 *           type: number
 *           description: Number of items
 *         state:
 *           type: string
 *           description: State of item
 *       example:
 *         content: "Bread"
 *         count: 25
 *         state: "COMPLETED"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemResponse:
 *       type: object
 *       required:
 *         - id
 *         - content
 *         - count
 *         - state
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the item
 *         content:
 *           type: string
 *           description: The name of item
 *         count:
 *           type: number
 *           description: Number of items
 *         state:
 *           type: string
 *           description: State of item
 *         createdAt:
 *           type: string
 *           description: ISO8601 DateTime of creation
 *       example:
 *         id: "6624d6994d36dd621768f"
 *         content: "Bread"
 *         count: 25
 *         state: "COMPLETED"
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ListFilterBody:
 *       type: object
 *       required:
 *       properties:
 *         content:
 *           type: string
 *           description: Filter items by content
 *         count:
 *           type: number
 *           description: Filter items by count
 *         state:
 *           type: array
 *           items:
 *             type: string
 *           description: Filter items by multiple states
 *       example:
 *         content: "Bread"
 *         count: 25
 *         state: ["COMPLETED", "INCOMPLETE"]
 */